module.exports = (superclass) => class extends superclass {
  constructor(args) {
    superclass.name === 'HTMLElement' ? super() : super(args);

    const {template} = args;

    this._root = this.attachShadow({mode: 'open'});
    this._template = document.querySelector(`#${template}`);
    this._root.appendChild(this._template.content.cloneNode(true));
  }
};
