'use client';

import { baseURL } from '@/config/baseUrl';
import React, { useState } from 'react';


const CustomPoll = () => {
  const [title, setTitle] = useState('');
  const [competitors, setCompetitors] = useState(['']);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/api/polls/custom_poll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title,competitors: competitors.filter(c => c) }),
    });
    if (response.ok) {
      setMessage('Poll created successfully!');
      setTitle('');
      setCompetitors(['']);
    } else {
      setMessage('Failed to create poll');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Poll</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Poll Title"
          className="w-full p-2 border rounded"
          required
        />
        {competitors.map((comp, index) => (
          <input
            key={index}
            type="text"
            value={comp}
            onChange={(e) => {
              const newCompetitors = [...competitors];
              newCompetitors[index] = e.target.value;
              setCompetitors(newCompetitors);
            }}
            placeholder={`Competitor ${index + 1}`}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <div className="flex gap-8">
        <button
          type="button"
          onClick={() => setCompetitors([...competitors, ''])}
          className="bg-blue-500 text-white p-2 rounded-xl"
        >
          Add Competitor
        </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded-xl">
          Create Poll
        </button></div>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CustomPoll; 