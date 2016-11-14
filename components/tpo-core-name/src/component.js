require('tpo-edit-bar');
const core = require('tpo-mixins/core.js');
const shadow = require('tpo-mixins/shadow.js');
const trepo = require('tpo-mixins/trepo.js');

class CoreName extends trepo(core(shadow(HTMLElement))) {
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
    this._mutation({
      query: `createName(input: $input) {id}`,
      input: {
        name: this.$.name.value,
        person: this.person,
      },
      type: 'NameCreateInput',
    })
    .then((data) => {
      this.node = data.id;
      this.$.bar.created();
    })
    .catch((error) => {
      this.$.bar.errored('Create failed');
    });
  }

  _update() {
    this._mutation({
      query: `updateName(input: $input) {id}`,
      input: {
        id: this.node,
        name: this.$.name.value,
        person: this.person,
      },
      type: 'NameUpdateInput',
    })
    .then((data) => {
      this.$.bar.updated();
    })
    .catch((error) => {
      this.$.bar.errored('Update failed');
    });
  }

  _delete() {
    this._mutation({
      query: `deleteName(input: $input)`,
      input: {
        id: this.node,
      },
      type: 'DeleteInput',
    })
    .then((data) => {
      this.node = null;
      this.$.bar.deleted();
    })
    .catch((error) => {
      this.$.bar.errored('Delete failed');
    });
  }
}

window.customElements.define('tpo-core-name', CoreName);

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);
