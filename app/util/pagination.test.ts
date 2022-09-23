import { getSortValue, sortStringToSortObject } from './pagination';

describe('sortStringToSortObject', () => {
  it('converts a sort string into a sort object: single field', () => {
    const sortString = '+firstName';

    const sortObject = sortStringToSortObject(sortString);

    expect(sortObject).toEqual({
      firstName: 'asc',
    });
  });

  it('converts a sort string into a sort object: multiple fields', () => {
    const sortString = '+firstName,-lastName,+createdAt';

    const sortObject = sortStringToSortObject(sortString);

    expect(sortObject).toEqual({
      firstName: 'asc',
      lastName: 'desc',
      createdAt: 'asc',
    });
  });

  it('throws an error when given an invalid string', () => {
    const invalidSortString = '~firstName';

    return expect(() => sortStringToSortObject(invalidSortString)).toThrow('Invalid sort string');
  });
});

describe('getSortValue', () => {
  it('returns asc when the key is not present in the sort object', () => {
    const sortObject = {};

    const sortValue = getSortValue(sortObject, 'firstName');

    expect(sortValue).toBe('asc');
  });

  it("returns desc when the key's value is asc", () => {
    const sortObject = {
      firstName: 'asc',
    };

    const sortValue = getSortValue(sortObject, 'firstName');

    expect(sortValue).toBe('desc');
  });

  it("returns undefined when the key's value is desc", () => {
    const sortObject = {
      firstName: 'desc',
    };

    const sortValue = getSortValue(sortObject, 'firstName');

    expect(sortValue).toBe(null);
  });
});
