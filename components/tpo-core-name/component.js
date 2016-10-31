const template = require('./template.html');

class CoreName extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = 'hello!';
  }
}

document.head.insertAdjacentHTML('beforeend', template);
window.customElements.define('tpo-core-name', CoreName);
