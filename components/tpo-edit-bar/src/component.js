const core = require('tpo-mixins/core.js');
const light = require('tpo-mixins/light.js');

class EditBar extends core(light(HTMLElement)) {
  constructor() {
    super({
      template: 'tpo-edit-bar',
      attributes: EditBar.observedAttributes,
      $: {
        message: '#message',
        save: '#save',
        delete: '#delete',
        yes: '#yes',
        no: '#no',
      },
    });
  }

  static get observedAttributes() {
    return [
      'state',
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.save.addEventListener('click', (e) => this._saveClicked());
    this.$.delete.addEventListener('click', (e) => this._deleteClicked());
    this.$.yes.addEventListener('click', (e) => this._yesClicked());
    this.$.no.addEventListener('click', (e) => this._noClicked());

    if (!['new', 'saved'].includes(this.state)) {
      this.state = 'new';
    } else {
      this._stateChanged(this.state);
    }
  }

  _stateChanged(state) {
    switch(state) {
      case 'new':
        this.$.message.innerText = '';
        this.$.message.classList.remove('error');
        this.$.save.hidden = false;
        this.$.save.disabled = false;
        this.$.delete.hidden = true;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'creating':
        this.$.message.innerText = 'Creating...';
        this.$.message.classList.remove('error');
        this.$.save.hidden = false;
        this.$.save.disabled = true;
        this.$.delete.hidden = true;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'creating-error':
        this.$.message.innerText = this.message;
        this.$.message.classList.add('error');
        this.$.save.hidden = false;
        this.$.save.disabled = false;
        this.$.delete.hidden = true;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'saved':
        this.$.message.innerText = '';
        this.$.message.classList.remove('error');
        this.$.save.hidden = false;
        this.$.save.disabled = true;
        this.$.delete.hidden = false;
        this.$.delete.disabled = false;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'changed':
        this.$.message.innerText = '';
        this.$.message.classList.remove('error');
        this.$.save.hidden = false;
        this.$.save.disabled = false;
        this.$.delete.hidden = false;
        this.$.delete.disabled = false;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'saving':
        this.$.message.innerText = 'Saving...';
        this.$.message.classList.remove('error');
        this.$.save.hidden = false;
        this.$.save.disabled = true;
        this.$.delete.hidden = false;
        this.$.delete.disabled = true;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'saving-error':
        this.$.message.innerText = this.message;
        this.$.message.classList.add('error');
        this.$.save.hidden = false;
        this.$.save.disabled = false;
        this.$.delete.hidden = false;
        this.$.delete.disabled = false;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'changed-delete-confirmation':
      case 'saved-delete-confirmation':
        this.$.message.innerText = 'Are you sure?';
        this.$.message.classList.remove('error');
        this.$.save.hidden = true;
        this.$.delete.hidden = true;
        this.$.yes.hidden = false;
        this.$.yes.disabled = false;
        this.$.no.hidden = false;
        this.$.no.disabled = false;
        break;
      case 'changed-deleting':
      case 'saved-deleting':
        this.$.message.innerText = 'Deleting...';
        this.$.message.classList.remove('error');
        this.$.save.hidden = false;
        this.$.save.disabled = true;
        this.$.delete.hidden = false;
        this.$.delete.disabled = true;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'changed-deleting-error':
        this.$.message.innerText = this.message;
        this.$.message.classList.add('error');
        this.$.save.hidden = false;
        this.$.save.disabled = false;
        this.$.delete.hidden = false;
        this.$.delete.disabled = false;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
      case 'saved-deleting-error':
        this.$.message.innerText = this.message;
        this.$.message.classList.add('error');
        this.$.save.hidden = false;
        this.$.save.disabled = true;
        this.$.delete.hidden = false;
        this.$.delete.disabled = false;
        this.$.yes.hidden = true;
        this.$.no.hidden = true;
        break;
    }
  }

  _saveClicked() {
    switch(this.state) {
      case 'new':
      case 'creating-error':
        this.state = 'creating';
        break;
      case 'changed':
      case 'saving-error':
      case 'changed-deleting-error':
        this.state = 'saving';
        break;
    }
  }

  _deleteClicked(e) {
    switch(this.state) {
      case 'saved':
      case 'saved-deleting-error':
        this.state = 'saved-delete-confirmation';
        break;
      case 'changed':
      case 'saving-error':
      case 'changed-deleting-error':
        this.state = 'changed-delete-confirmation';
        break;
    }
  }

  _yesClicked(e) {
    switch(this.state) {
      case 'saved-delete-confirmation':
        this.state = 'saved-deleting';
        break;
      case 'changed-delete-confirmation':
        this.state = 'changed-deleting';
        break;
    }
  }

  _noClicked(e) {
    switch(this.state) {
      case 'saved-delete-confirmation':
        this.state = 'saved';
        break;
      case 'changed-delete-confirmation':
        this.state = 'changed';
        break;
    }
  }

  created() {
    this.state = 'saved';
  }

  updated() {
    this.state = 'saved';
  }

  deleted() {
    this.state = 'new';
  }

  changed() {
    switch(this.state) {
      case 'saved':
        this.state = 'changed';
        break;
      case 'saved-delete-confirmation':
        this.state = 'changed-delete-confirmation';
        break;
      case 'saved-deleting-error':
        this.state = 'changed-deleting-error';
        break;
    }
  }

  errored(message) {
    this.message = message;
    switch(this.state) {
      case 'creating':
        this.state = 'creating-error';
        break;
      case 'saving':
        this.state = 'saving-error';
        break;
      case 'saved-deleting':
        this.state = 'saved-deleting-error';
        break;
      case 'changed-deleting':
        this.state = 'changed-deleting-error';
        break;
    }
  }
}

window.customElements.define('tpo-edit-bar', EditBar);

const template = require('./template.html');
document.head.insertAdjacentHTML('beforeend', template);
