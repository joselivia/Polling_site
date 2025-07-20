'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '@/config/baseUrl';



interface Competitor {
  id: number;
  name: string;
}

const CustomPollVote = ({ pollId }: { pollId: number }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${baseURL}/api/custom-polls/${pollId}/competitors`)
      .then(res => setCompetitors(res.data))
      .catch(err => console.error('Error loading competitors:', err));
  }, [pollId]);

  const handleVote = async () => {
    if (!selectedId) return;

    try {
      await axios.post(`${baseURL}/api/custom-polls/vote`, {
        competitorId: selectedId
      });
      setMessage('✅ Vote recorded!');
    } catch (error) {
      console.error('Vote error:', error);
      setMessage('❌ Failed to record vote');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Vote Now</h2>
      <form className="space-y-2">
        {competitors.map(c => (
          <div key={c.id} className="flex items-center">
            <input
              type="radio"
              id={`comp-${c.id}`}
              name="competitor"
              value={c.id}
              checked={selectedId === c.id}
              onChange={() => setSelectedId(c.id)}
              className="mr-2"
            />
            <label htmlFor={`comp-${c.id}`}>{c.name}</label>
          </div>
        ))}
      </form>
      <button
        onClick={handleVote}
        disabled={!selectedId}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Submit Vote
      </button>
      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </div>
  );
};

export default CustomPollVote;
