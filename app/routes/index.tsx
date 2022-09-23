// routes/index.js
import type { Participant } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams } from '@remix-run/react';
import prisma from '~/db/db.server';
import { ArrowLeft } from '~/icons/arrow-left';
import { ArrowRight } from '~/icons/arrow-right';

interface LoaderResponse {
  count: number;
  lastPage: number;
  participants: Participant[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get('page') || '0');
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

  const [count, participants] = await prisma.$transaction([
    prisma.participant.count(),
    prisma.participant.findMany({
      take: 10,
      skip: page * pageSize,
    }),
  ]);
  const lastPage = Math.floor(count / pageSize);

  return { count, lastPage, participants };
};

export default function Index() {
  const { count, lastPage, participants } = useLoaderData<LoaderResponse>();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '0');
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === lastPage;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold underline mb-4'>Participants</h1>
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300'>
          <tr>
            <th scope='col' className='py-3 px-6'>
              First Name
            </th>
            <th scope='col' className='py-3 px-6'>
              Last Name
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
      <div className='grid grid-cols-3 w-full'>
        <div className='place-self-start'>
          <p>{count} participants.</p>
        </div>
        <p className='place-self-center'>Page {currentPage + 1}</p>
        <div className='place-self-end w-16 flex justify-between'>
          <div>
            {!isFirstPage ? (
              <Link to={{ pathname: `?page=${previousPage}` }} aria-label='previous page'>
                <ArrowLeft />
              </Link>
            ) : null}
          </div>
          <div>
            {!isLastPage ? (
              <Link to={{ pathname: `?page=${nextPage}` }} aria-label='next page'>
                <ArrowRight />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
