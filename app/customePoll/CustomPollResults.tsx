'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { baseURL } from '@/config/baseUrl';



interface Competitor {
  id: number;
  name: string;
  voteCount: number;
}

interface CustomPollData {
  title: string;
  competitors: Competitor[];
}

const COLORS = ['#1e40af', '#9333ea', '#059669', '#f59e0b', '#ef4444', '#3b82f6', '#0ea5e9'];

const CustomPollResults = ({ pollId }: { pollId: number }) => {
  const [data, setData] = useState<CustomPollData | null>(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/custom-polls/${pollId}/results`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching poll results:', err));
  }, [pollId]);

  if (!data) return <p className="text-center p-4">Loading custom poll...</p>;

  const totalVotes = data.competitors.reduce((sum, c) => sum + c.voteCount, 0);
  const chartData = data.competitors.map(c => ({
    name: c.name,
    votes: c.voteCount,
    percentage: totalVotes > 0 ? ((c.voteCount / totalVotes) * 100).toFixed(2) : '0.00'
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">{data.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="votes"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Bar Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="votes">
                {chartData.map((_, index) => (
                  <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabular View */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Results Table</h3>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Candidate</th>
            <th className="text-left p-2">Votes</th>
            <th className="text-left p-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((c, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.votes}</td>
              <td className="p-2">{c.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm text-gray-500 mt-4">
        Total Votes: {totalVotes.toLocaleString()}
      </p>
    </div>
  );
};

export default CustomPollResults;
