// routes/index.js
import type { Participant } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import prisma from '~/db/db.server';

export const loader = async () => {
  const data = {
    participants: await prisma.participant.findMany({
      take: 10,
    }),
  };
  return data;
};

export default function Index() {
  const { participants } = useLoaderData<{ participants: Participant[] }>();

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
    </>
  );
}
