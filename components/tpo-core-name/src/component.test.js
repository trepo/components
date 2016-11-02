const {expect} = require('chai');

let element;

describe('tpo-core-name', () => {
  beforeEach(() => {
    document.body.insertAdjacentHTML('beforeend',
      '<tpo-core-name></tpo-core-name>');
    element = document.body.lastChild;
  });
  afterEach(() => {
    document.body.removeChild(element);
  });
  it('should work', () => {
    expect(element.innerHTML).to.equal('hello!');
  });
});
