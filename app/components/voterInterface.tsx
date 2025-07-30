'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '@/config/baseUrl';

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
  percentage: string;
}

interface PollData {
  pollTitle: string;
  totalVotes: number;
  results: Candidate[];
  created_at: Date | string;
}

const VoteInterface = ({ id }: { id: number }) => {
  const [data, setData] = useState<PollData | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${baseURL}/aspirant/${id}`)
        .then(res => {
          console.log('API Response:', res.data);
          setData(res.data as PollData);
        })
        .catch(err => console.error(err));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval); 
  }, [id]);

  const handleVote = async () => {
    if (!selectedCandidateId || !data) return;

    setIsVoting(true);
    try {
      const response = await axios.post(`${baseURL}/api/votes`, {
        id,
        competitorId: selectedCandidateId,
      });
      if (response.status === 200) {
        setMessage('Vote recorded successfully!');
        setSelectedCandidateId(null);       } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Error voting:', error);
      setMessage('Failed to record vote. Please ensure you selected the correct poll.');
    } finally {
      setIsVoting(false);
    }
  };

  if (!data) return <p className="text-center p-4">Loading poll data...</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">{data.pollTitle} Voting</h1>
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Cast Your Vote</h2>
        <p className="text-gray-600 mt-2">
          Total Votes: {data.totalVotes.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Last Updated: {new Date(data. created_at).toLocaleString('en-US', { timeZone: 'EAT' })}
        </p>
        <div className="mt-4 space-y-2">
          {data.results.map((candidate) => (
            <div key={candidate.id} className="flex items-center">
              <input
                type="radio"
                id={`candidate-${candidate.id}`}
                name="candidate"
                value={candidate.id}
                checked={selectedCandidateId === candidate.id}
                onChange={() => setSelectedCandidateId(candidate.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                disabled={isVoting}
              />
              <label htmlFor={`candidate-${candidate.id}`} className="ml-2 block text-sm text-gray-900">
                {candidate.name} ({candidate.percentage}%)
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleVote}
          disabled={isVoting || !selectedCandidateId}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isVoting ? 'Voting...' : 'Submit Vote'}
        </button>
        {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
      </div>

    </div>
  );
};

export default VoteInterface;