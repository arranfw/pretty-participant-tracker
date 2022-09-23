interface PaginationQueryOptions {
  page: string;
  pageSize: string;
}

export const getPaginationQuery = ({ page, pageSize }: PaginationQueryOptions): string => {
  const paginationSearchParams = new URLSearchParams({
    page,
    pageSize,
  });

  return `?${paginationSearchParams.toString()}`;
};

export const getSortValue = (sortObject: SortObject, sortKey: string): string | null => {
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

export const parseSortString = (sortString: string) => {
  const sortItem = sortString.split(',');
  const sortObject: Record<string, string> = {};

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
