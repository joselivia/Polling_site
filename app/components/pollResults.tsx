"use client";

import React from "react";
import axios from "axios";
import useSWR from "swr";
import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  Pie,
  BarChart,
  Bar,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";
import { baseURL } from "@/config/baseUrl";


// Interfaces
interface Candidate {
  id: number;
  name: string;
  voteCount: number;
  percentage: string;
}

interface PollData {
  id: number;
  pollTitle: string;
  region: string;
  totalVotes: number;
  results: Candidate[];
  lastUpdated: Date | string;
}

// Constants
const COLORS = [
  "#1e40af",
  "#9333ea",
  "#059669",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const PollResults = ({ pollId }: { pollId?: number }) => {
  const { data, error, isLoading } = useSWR<PollData>(
    pollId ? `${baseURL}/api/polls/${pollId}/results` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (isLoading) return <p className="text-center p-4">Loading results...</p>;
  if (error || !data)
    return (
      <p className="text-center p-4 text-red-500">Error loading data.</p>
    );

  const chartData = data.results.map((candidate: Candidate) => ({
    id: candidate.id,
    name: candidate.name,
    votes: candidate.voteCount,
    percentage: parseFloat(candidate.percentage),
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        {data.pollTitle || "Poll Results"}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-sm mb-2">Region: {data.region}</p>
        <p className="text-gray-600 mb-2">
          Registered Voters: {data.totalVotes.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">
          Turnout: {data.totalVotes > 0 ? "100%" : "0%"}
        </p>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Pie Chart
            </h2>
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
                  {chartData.map((entry) => (
                    <Cell
                      key={`pie-${entry.id}`}
                      fill={COLORS[entry.id % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Bar Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes">
                  {chartData.map((entry) => (
                    <Cell
                      key={`bar-${entry.id}`}
                      fill={COLORS[entry.id % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mt-6 text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Candidate</th>
              <th className="text-left py-2">%</th>
              <th className="text-left py-2">Chart</th>
              <th className="text-left py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((candidate: Candidate) => (
              <tr key={candidate.id} className="border-b">
                <td className="py-2 font-medium">{candidate.name}</td>
                <td className="py-2">{candidate.percentage}%</td>
                <td className="py-2 w-1/4 pr-10">
                  <div className="h-4 bg-gray-200 rounded">
                    <div
                      className="h-4 rounded"
                      style={{
                        width: `${candidate.percentage}%`,
                        backgroundColor:
                          COLORS[candidate.id % COLORS.length],
                      }}
                    />
                  </div>
                </td>
                <td className="py-2">
                  {candidate.voteCount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          Est. Votes Counted: 100% | Last Updated:{" "}
          {new Date(data.lastUpdated).toLocaleString("en-KE")}
        </p>

        {/* Buttons */}
        <div className="flex text-center justify-between">
          <Link href={`/FullvotesInterface?id=${pollId}`}>
            <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
              Full Details
            </button>
          </Link>
          <a href={`/vote/${pollId}`}>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
              Vote Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
