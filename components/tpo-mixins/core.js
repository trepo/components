module.exports = (superclass) => class extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);
    this._connected = false;

    // All attributes are strings, matching the dom
    const {attributes = {}} = args;

    // Setup getters/setters for each attribute
    // Attributes and getters/setters are always kept in sync
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

    const {$ = {}} = args;
    this.$ = $;
  }

  // Only call callbacks after we connect and if there is a registered handler
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this._connected && this[`_${attrName}Changed`]) {
      this[`_${attrName}Changed`].call(this, newVal, oldVal);
    }
  }

  // Mark as connected so we start calling attribute callbacks
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    for (const key of Object.keys(this.$)) {
      this.$[key] = this._root.querySelector(this.$[key]);
    }

    this._connected = true;
  }
};
