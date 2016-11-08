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
    expect(element.innerHTML).to.equal('hello!');
  });
});
