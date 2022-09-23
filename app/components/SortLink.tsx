import type { ReactNode } from 'react';
import { Link, useSearchParams } from '@remix-run/react';
import React from 'react';

import {
  getPaginationQuery,
  getNextSortValue,
  parseSortString,
  stringifySortObject,
} from '~/util/pagination';

interface SortHeaderProps {
  sortKey: string;
  children: ReactNode;
}

export const SortLink: React.FC<SortHeaderProps> = ({ sortKey, children }) => {
  //GET /cars?sort=-manufactorer,+model
  const [searchParams] = useSearchParams();

  const currentPageSize = searchParams.get('pageSize') || '10';
  const currentPage = searchParams.get('page') || '1';
  const currentSortObject = parseSortString(searchParams.get('sort') || '');

  const currentSortValue = currentSortObject[sortKey];
  const nextSortValue = getNextSortValue(currentSortObject, sortKey);

  if (!nextSortValue) {
    delete currentSortObject[sortKey];
  }

  return (
    <Link
      to={getPaginationQuery({
        page: currentPage,
        pageSize: currentPageSize,
        sort: stringifySortObject({
          ...currentSortObject,
          ...(nextSortValue ? { [sortKey]: nextSortValue } : {}),
        }),
      })}
    >
      {children} {currentSortValue}
    </Link>
  );
};
