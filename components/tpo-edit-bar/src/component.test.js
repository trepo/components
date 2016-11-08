const {expect} = require('chai');

let element;

describe('tpo-core-name', () => {
  beforeEach(() => {
    document.body.insertAdjacentHTML('beforeend',
      '<tpo-edit-bar></tpo-edit-bar>');
    element = document.body.lastChild;
  });
  afterEach(() => {
    document.body.removeChild(element);
  });
  it('should work', () => {
    expect(element.state).to.equal('new');
  });
  it('should default state to new');
  it('should allow state to be set to new');
  it('should allow state to be set to extant');
  it('should display new correctly');
  it('should display saving correctly');
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
});
