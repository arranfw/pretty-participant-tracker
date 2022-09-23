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
  console.log({ isFirstPage, isLastPage });
  return (
    <>
      <div>
        <h1 className='text-3xl font-bold underline'>Participants</h1>
      </div>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            <h1>
              {participant.firstname} {participant.lastname}
            </h1>
          </li>
        ))}
      </ul>
      <div className='flex'>
        {!isFirstPage ? (
          <Link to={{ pathname: `?page=${previousPage}` }}>
            <ArrowLeft />
          </Link>
        ) : null}
        {!isLastPage ? (
          <Link to={{ pathname: `?page=${nextPage}` }}>
            <ArrowRight />
          </Link>
        ) : null}
      </div>
      <p>Page {currentPage + 1}</p>
      <p>{count} participants.</p>
    </>
  );
}
