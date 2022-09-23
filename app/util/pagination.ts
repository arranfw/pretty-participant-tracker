interface PaginationQueryOptions {
  page: string;
  pageSize: string;
}

export const getPaginationQuery = ({ page, pageSize }: PaginationQueryOptions): string => {
  const paginationSearchParams = new URLSearchParams({
    page,
    pageSize,
  });

  return paginationSearchParams.toString();
};
