const { expect } = require('chai');
const { withoutAttrs } = require('../../src/utils/object');

describe('object', () => {
  it('should remove not required attributes from the given object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const notRequiredAttributes = ['b', 'c'];
    const result = withoutAttrs(obj, notRequiredAttributes);
    expect(result).to.deep.equal({ a: 1 });
  });

  it('should return the original object if no not required attributes are specified', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const notRequiredAttributes = [];
    const result = withoutAttrs(obj, notRequiredAttributes);
    expect(result).to.deep.equal(obj);
  });
});
