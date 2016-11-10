const {expect} = require('chai');

let element = null;

function create(props = {}) {
  const attrs = [];
  for (const prop of Object.keys(props)) {
    attrs.push(`${prop}="${props[prop]}"`);
  }
  document.body.insertAdjacentHTML('beforeend',
    `<tpo-edit-bar ${attrs.join(' ')}></tpo-edit-bar>`);
  element = document.body.lastChild;
}

function ensure(elem, type, val = '') {
  switch(type) {
    case 'shown':
      expect(element.$[elem].hidden).to.equal(false);
      expect(element.$[elem].disabled).to.equal(false);
      break;
    case 'hidden':
      expect(element.$[elem].hidden).to.equal(true);
      break;
    case 'disabled':
      expect(element.$[elem].hidden).to.equal(false);
      expect(element.$[elem].disabled).to.equal(true);
      break;
    case 'equals':
      expect(element.$[elem].textContent).to.equal(val);
      break;
  }
}

describe('tpo-core-name', () => {
  afterEach(() => {
    if (element !== null) {
      document.body.removeChild(element);
      element = null;
    }
  });

  it('should default state to new', () => {
    create();
    expect(element.state).to.equal('new');
  });

  it('should allow state to be set to new', () => {
    create({state: 'new'});

    expect(element.state).to.equal('new');
  });

  it('should allow state to be set to extant', () => {
    create({state: 'extant'});

    expect(element.state).to.equal('extant');
  });

  it('should display new correctly', () => {
    create();

    expect(element.state).to.equal('new');
    ensure('save', 'shown');
    ensure('delete', 'hidden');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', '');
  });

  it('should display saving correctly', () => {
    create();
    element.$.save.click();

    expect(element.state).to.equal('creating');
    ensure('save', 'disabled');
    ensure('delete', 'hidden');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'Creating...');
  });

  it('should display saving-error correctly', () => {
    create();
    element.$.save.click();
    element.errored('error message');

    expect(element.state).to.equal('creating-error');
    ensure('save', 'shown');
    ensure('delete', 'hidden');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'error message');
  });

  it('should display extant correctly', () => {
    create();
    element.$.save.click();
    element.created();

    expect(element.state).to.equal('extant');
    ensure('save', 'disabled');
    ensure('delete', 'shown');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', '');
  });

  it('should display changed correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.changed();

    expect(element.state).to.equal('changed');
    ensure('save', 'shown');
    ensure('delete', 'shown');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', '');
  });

  it('should display saving correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.changed();
    element.$.save.click();

    expect(element.state).to.equal('saving');
    ensure('save', 'disabled');
    ensure('delete', 'disabled');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'Saving...');
  });

  it('should display saving-error correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.changed();
    element.$.save.click();
    element.errored('error message');

    expect(element.state).to.equal('saving-error');
    ensure('save', 'shown');
    ensure('delete', 'shown');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'error message');
  });

  it('should display changed-delete-confirmation correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.changed();
    element.$.delete.click();

    expect(element.state).to.equal('changed-delete-confirmation');
    ensure('save', 'hidden');
    ensure('delete', 'hidden');
    ensure('yes', 'shown');
    ensure('no', 'shown');
    ensure('message', 'equals', 'Are you sure?');
  });

  it('should display changed-deleting correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.changed();
    element.$.delete.click();
    element.$.yes.click();

    expect(element.state).to.equal('changed-deleting');
    ensure('save', 'disabled');
    ensure('delete', 'disabled');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'Deleting...');
  });

  it('should display changed-deleting-error correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.changed();
    element.$.delete.click();
    element.$.yes.click();
    element.errored('error message');

    expect(element.state).to.equal('changed-deleting-error');
    ensure('save', 'shown');
    ensure('delete', 'shown');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'error message');
  });

  it('should display extant-delete-confirmation correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.$.delete.click();

    expect(element.state).to.equal('extant-delete-confirmation');
    ensure('save', 'hidden');
    ensure('delete', 'hidden');
    ensure('yes', 'shown');
    ensure('no', 'shown');
    ensure('message', 'equals', 'Are you sure?');
  });

  it('should display extant-deleting correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.$.delete.click();
    element.$.yes.click();

    expect(element.state).to.equal('extant-deleting');
    ensure('save', 'disabled');
    ensure('delete', 'disabled');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'Deleting...');
  });

  it('should display extant-deleting-error correctly', () => {
    create();
    element.$.save.click();
    element.created();
    element.$.delete.click();
    element.$.yes.click();
    element.errored('error message');

    expect(element.state).to.equal('extant-deleting-error');
    ensure('save', 'disabled');
    ensure('delete', 'shown');
    ensure('yes', 'hidden');
    ensure('no', 'hidden');
    ensure('message', 'equals', 'error message');
  });

  it('should fire create event', (done) => {
    create();

    element.addEventListener('create', () => done());

    element.$.save.click();
  });

  it('should fire update event', (done) => {
    create({state: 'extant'});

    element.addEventListener('update', () => done());

    element.changed();
    element.$.save.click();
  });

  it('should fire delete event', (done) => {
    create({state: 'extant'});

    element.addEventListener('delete', () => done());

    element.$.delete.click();
    element.$.yes.click();
  });
});
