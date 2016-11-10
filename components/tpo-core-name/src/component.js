require('tpo-edit-bar');
const core = require('tpo-mixins/core.js');
const shadow = require('tpo-mixins/shadow.js');

class CoreName extends core(shadow(HTMLElement)) {
  constructor() {
    super({
      template: 'tpo-core-name',
      attributes: CoreName.observedAttributes,
      $: {
        toggle: '#toggle',
        name: '#name',
        bar: '#edit-bar',
      },
    });
  }

  static get observedAttributes() {
    return [
      'node',
      'person',
      'repo',
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.toggle.addEventListener('click', (e) => this._toggle());

    this.$.name.addEventListener('input', (e) => this.$.bar.changed());

    this.$.bar.addEventListener('create', (e) => this._create());
    this.$.bar.addEventListener('update', (e) => this._update());
    this.$.bar.addEventListener('delete', (e) => this._delete());
  }

  _toggle() {
    console.log('toggle');
  }

  _nodeChanged(newVal, oldVal) {
    console.log('nodeChanged', newVal, oldVal);
  }

  _create() {
    console.log('create');
    this.$.bar.created();
  }

  _update() {
    console.log('update');
    this.$.bar.updated();
  }

  _delete() {
    console.log('delete');
    this.$.bar.deleted();
  }
}

window.customElements.define('tpo-core-name', CoreName);

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);
