// routes/index.js
import type { Participant } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';

import prisma from '~/db/db.server';
import { MenuItem, Menu } from '~/components/Menu';
import { ArrowLeft, ArrowRight } from '~/icons';
import { PaginationLink } from '~/components/PaginationLink';
import { useEffect } from 'react';
import { getPaginationQuery } from '~/util/pagination';
import { SortLink } from '~/components/SortLink';

interface LoaderResponse {
  count: number;
  lastPage: number;
  participants: Participant[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const participantCount = await prisma.participant.count();

  let page = parseInt(url.searchParams.get('page') || '0') - 1;
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
  const lastPage = Math.ceil(participantCount / pageSize);

  if (page * pageSize > participantCount) {
    page = lastPage;
  }

  const participants = await prisma.participant.findMany({
    take: pageSize,
    skip: page * pageSize,
    orderBy: { lastname: 'asc' },
  });

  return { count: participantCount, lastPage, participants };
};

export default function Index() {
  const { count, lastPage, participants } = useLoaderData<LoaderResponse>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSort = searchParams.get('sort') || '';
  const currentPageSize = parseInt(searchParams.get('pageSize') || '10');
  const currentPage = parseInt(searchParams.get('page') || '1');
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  useEffect(() => {
    // redirect user if they extend pagesize beyond what's available
    if (currentPage > lastPage) {
      navigate(
        `/?${getPaginationQuery({
          page: lastPage.toString(),
          pageSize: currentPageSize.toString(),
          sort: currentSort,
        })}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentPageSize, lastPage]);

  return (
    <div className='mb-20'>
      <h1 className='text-3xl font-bold underline mb-4'>Participants</h1>
      <div className='rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                <SortLink sortKey='firstname'>First Name</SortLink>
              </th>
              <th scope='col' className='py-3 px-6'>
                <SortLink sortKey='lastname'>Last Name</SortLink>
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr
                key={participant.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <td className='py-4 px-6  text-gray-900 whitespace-nowrap dark:text-white'>
                  {participant.firstname}
                </td>
                <td className='py-4 px-6  text-gray-900 whitespace-nowrap dark:text-white'>
                  {participant.lastname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='grid grid-cols-3 w-full'>
        <p className='place-self-start'>{count} participants.</p>
        <p className='place-self-center'>
          Page {currentPage}/{lastPage}
        </p>
        <div className='place-self-end flex justify-between items-center gap-2'>
          <Menu menuLabel={currentPageSize}>
            {['10', '20', '100'].map((size) => (
              <MenuItem
                key={size}
                to={getPaginationQuery({
                  page: currentPage.toString(),
                  pageSize: size,
                  sort: currentSort,
                })}
              >
                {size}
              </MenuItem>
            ))}
          </Menu>
          <PaginationLink page={previousPage.toString()} disabled={isFirstPage}>
            <ArrowLeft />
          </PaginationLink>
          <PaginationLink page={nextPage.toString()} disabled={isLastPage}>
            <ArrowRight />
          </PaginationLink>
        </div>
      </div>
    </div>
  );
}
