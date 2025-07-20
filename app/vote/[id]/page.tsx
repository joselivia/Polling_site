'use client';
import VoteInterface from '@/app/components/voterInterface';
import { useParams } from 'next/navigation';
import React from 'react';


export default function VotePage() {
  const params = useParams();
  const pollId = parseInt(params.id as string);

  if (isNaN(pollId)) {
    return <div className="text-red-500 text-center p-4">❌ Invalid poll ID in URL</div>;
  }

  return <VoteInterface pollId={pollId} />;
}
