module.exports = (superclass) => class extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {template} = args;

    this._root = this;
    this._template = document.querySelector(`#${template}`);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this._root.appendChild(this._template.content.cloneNode(true));
  }
};
