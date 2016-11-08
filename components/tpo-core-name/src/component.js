require('tpo-edit-bar');
const core = require('tpo-mixins/core.js');
const shadow = require('tpo-mixins/shadow.js');

class CoreName extends shadow(core(HTMLElement)) {
  constructor() {
    super({
      template: 'tpo-core-name',
      attributes: CoreName.observedAttributes,
      $: {
        toggle: '#toggle',
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

    this.$.toggle.addEventListener('click', (e) => {
      console.log('toggling', e.target);
    });
  }

  _nodeChanged(newVal, oldVal) {
    console.log('nodeChanged', newVal, oldVal);
  }
}

window.customElements.define('tpo-core-name', CoreName);

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);
