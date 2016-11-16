module.exports = (superclass) => class extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    // We start out not connected and no initial state
    this._connected = false;
    this._initialState = {};

    // Setup js getters/setters for each attribute
    // Attributes and getters/setters are always kept in sync
    // All attributes are strings, matching the dom spec/behavior
    const {attributes = {}} = args;
    for (const attr of attributes) {
      Object.defineProperty(this, attr, {
        // TODO consider moving these to _get/_set
        get: () => this.getAttribute(attr),
        // Setting to null removes the attribute,
        // and anything else is coerced to a string
        set: (val) => {
          if (val === null) {
            this.removeAttribute(attr);
          } else {
            this.setAttribute(attr, val);
          }
        },
      });
    }

    // Setup $ object, which we populate in connectedCallback
    const {$ = {}} = args;
    this.$ = $;

    // Create our root (shadow or light), and populate _template.$
    const {template = null, shadow = true} = args;
    if (template !== null) {
      if (shadow) {
        this._root = this.attachShadow({mode: 'open'});
      } else {
        this._root = this;
      }
      this._template = document.querySelector(`#${template}`);
      this._template.$ = {};
      for (const key of Object.keys(this.$)) {
        this._template.$[key] =
          this._template.content.querySelector(this.$[key]);
      }
    }
  }

  // Only call callbacks after we connect and if there is a registered handler
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this._connected && this[`_${attrName}Changed`]) {
      this[`_${attrName}Changed`].call(this, newVal, oldVal);
    }
  }

  // Set our component's initial state.
  // This is used when we have state that cannot easily be set via attributes.
  // Note that this may only be called before we are connected to the dom.
  setInitialState(state) {
    if (this._connected) {
      throw new Error('Cannot set initial state after being connected');
    }
    this._initialState = state;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    // Spec says that connectedCallback may be called more than once,
    // so we guard against that
    if (this._connected) {
      return;
    }

    // Let the component initialize state.
    // We initialize state _before_ stamping dom to give the component the
    // chance to manupulate the template
    if (this.initializeState) {
      this.initializeState(this._initialState);
    }

    // If we have a template, add it to the root and populate $
    if (this._template) {
      this._root.appendChild(this._template.content.cloneNode(true));
      for (const key of Object.keys(this.$)) {
        this.$[key] = this._root.querySelector(this.$[key]);
      }
    }

    // We are now connected
    this._connected = true;
  }
};
