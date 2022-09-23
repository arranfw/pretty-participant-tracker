import { getNextSortValue, parseSortString } from './pagination';

describe('parseSortString', () => {
  it('converts a sort string into a sort object: single field', () => {
    const sortString = '+firstname';

    const sortObject = parseSortString(sortString);

    expect(sortObject).toEqual({
      firstname: 'asc',
    });
  });

  it('converts a sort string into a sort object: multiple fields', () => {
    const sortString = '+firstname,-lastname,+createdAt';

    const sortObject = parseSortString(sortString);

    expect(sortObject).toEqual({
      firstname: 'asc',
      lastname: 'desc',
      createdAt: 'asc',
    });
  });

  it('throws an error when given an invalid string', () => {
    const invalidSortString = '~firstname';

    return expect(() => parseSortString(invalidSortString)).toThrow('Invalid sort string');
  });
});

describe('getNextSortValue', () => {
  it('returns asc when the key is not present in the sort object', () => {
    const sortObject = {};

    const sortValue = getNextSortValue(sortObject, 'firstname');

    expect(sortValue).toBe('asc');
  });

  it("returns desc when the key's value is asc", () => {
    const sortObject = {
      firstname: 'asc',
    };

    const sortValue = getNextSortValue(sortObject, 'firstname');

    expect(sortValue).toBe('desc');
  });

  it("returns undefined when the key's value is desc", () => {
    const sortObject = {
      firstname: 'desc',
    };

    const sortValue = getNextSortValue(sortObject, 'firstname');

    expect(sortValue).toBe(null);
  });
});
