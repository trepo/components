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

  it('should display saving-error correctly');

  it('should display extant correctly');

  it('should display changed correctly');

  it('should display saving correctly');

  it('should display saving-error correctly');

  it('should display changed-delete-confirmation correctly');

  it('should display changed-deleting correctly');

  it('should display changed-deleting-error correctly');

  it('should display extant-delete-confirmation correctly');

  it('should display extant-deleting correctly');

  it('should display extant-deleting-error correctly');

  it('should fire create event');

  it('should fire update event');

  it('should fire delete event');
});
