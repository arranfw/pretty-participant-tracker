import { Link, useSearchParams } from '@remix-run/react';
import type { ReactNode } from 'react';
import { getPaginationQuery } from '~/util/pagination';

interface PaginationLinkProps {
  disabled?: boolean;
  page: string;
  children: ReactNode;
}

export const PaginationLink: React.FC<PaginationLinkProps> = ({ disabled, page, children }) => {
  const [searchParams] = useSearchParams();

  const currentPageSize = searchParams.get('pageSize') || '10';

  if (disabled) {
    return (
      <span aria-hidden className='text-gray-600'>
        {children}
      </span>
    );
  }

  return (
    <Link
      to={{ pathname: getPaginationQuery({ page, pageSize: currentPageSize }) }}
      aria-label='previous page'
      className='text-gray-200'
    >
      {children}
    </Link>
  );
};
