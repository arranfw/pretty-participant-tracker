interface PaginationQueryOptions {
  page: string;
  pageSize: string;
  sort: string;
}

export const getPaginationQuery = ({ page, pageSize, sort }: PaginationQueryOptions): string => {
  const paginationSearchParams = new URLSearchParams({
    ...(page ? { page } : {}),
    ...(pageSize ? { pageSize } : {}),
    ...(sort ? { sort } : {}),
  });

  return `?${paginationSearchParams.toString()}`;
};

export const getNextSortValue = (sortObject: SortObject, sortKey: string): string | null => {
  switch (sortObject[sortKey]) {
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
  }
};

export type SortObject = Record<string, string>;

export const parseSortString = (sortString?: string): SortObject => {
  if (!sortString) {
    return {};
  }

  const sortItem = sortString.split(',');
  const sortObject: SortObject = {};

  sortItem.forEach((sortItem) => {
    const sortDirection = sortItem.charAt(0);
    const sortKey = sortItem.substring(1);

    switch (sortDirection) {
      case '+':
        sortObject[sortKey] = 'asc';
        break;
      case '-':
        sortObject[sortKey] = 'desc';
        break;
      default:
        throw new Error('Invalid sort string');
    }
  });

  return sortObject;
};

export const stringifySortObject = (sortObject: SortObject): string => {
  let sortItems: string[] = [];

  Object.entries(sortObject).forEach(([sortKey, sortValue]) => {
    switch (sortValue) {
      case 'asc':
        sortItems.push(`+${sortKey}`);
        break;
      case 'desc':
        sortItems.push(`-${sortKey}`);
        break;
      default:
        throw new Error('Invalid sort object value');
    }
  });

  return sortItems.join(',');
};
