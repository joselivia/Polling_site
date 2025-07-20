"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import PollResults from "./pollResults";
import { PollSummary } from "../page";
import { MdOutlinePerson } from "react-icons/md";
import { baseURL } from "@/config/baseUrl";

interface Candidate {
  id: number;
  profile?: string;
  name: string;
  party?: string;
  voteCount: number;
  percentage: string;
}

interface PollData {
  id: number;
  pollTitle: string;
  category?: string;
  region: string;
  county?: string;
  constituency?: string;
  party?: string;
  spoiled_votes?: number;
  totalVotes: number;
  results: Candidate[];
  lastUpdated: Date | string;
}

interface PollFullDetailsProps {
  category?: string;
  id?: string;
}

const COLORS = [
  "#1e40af",
  "#9333ea",
  "#059669",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

const PollFullDetails = ({ category, id }: PollFullDetailsProps) => {
  const [data, setData] = useState<PollData | null>(null);
  const [polls, setPolls] = useState<PollSummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await axios.get(`${baseURL}/api/polls/${id}/results`);
          setData(res.data);
        } else if (category) {
          const res = await axios.get(`${baseURL}/api/polls?category=${category}`);
          setPolls(res.data);
          if (res.data.length > 0) {
            const firstPoll = res.data[0];
            const details = await axios.get(`${baseURL}/api/polls/${firstPoll.id}/results`);
            setData(details.data);
          } else {
            setData(null);
          }
        }
      } catch (err) {
        console.error("❌ Failed to load poll data:", err);
      }
    };

    fetchData();
  }, [category, id]);

  if (data === null) {
    return <p className="text-center mt-8">No poll results found.</p>;
  }

  if (data && data.results.length === 0) {
    return <p className="text-center mt-8 text-red-600">Loading poll details... </p>;
  }

  const chartData = data.results.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    votes: candidate.voteCount,
    percentage: parseFloat(candidate.percentage),
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        {data.category || "Poll Results"} Candidates
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div>
            <p className="text-black text-2xl font-bold mb-2">
              Region: {data.region}
            </p>
            <p className="text-black text-xl font-bold mb-2">
              County: {data.county}
            </p>
            <p className="text-black mb-2">
              Registered Voters: {data.totalVotes.toLocaleString()}
            </p>
            <p className="text-black text-lg mb-2">
              Total Votes: {data.totalVotes.toLocaleString()}
            </p>
            <p className="text-black text-lg mb-2">
              Spoiled Votes:{" "}
              {data.spoiled_votes ? data.spoiled_votes.toLocaleString() : "0"}
            </p>
            <p className="text-black mb-4">
              Turnout: {data.totalVotes > 0 ? "100%" : "0%"}
            </p>
          </div>

          <ResponsiveContainer width={300} height={300}>
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
                {chartData.map((candidate) => (
                  <Cell
                    key={`cell-${candidate.id}`}
                    fill={COLORS[candidate.id % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <table className="w-full mt-6 text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Profile</th>
              <th className="text-left py-2">Candidate</th>
              <th className="text-left py-2">Party</th>
              <th className="text-left py-2">%</th>
              <th className="text-left py-2">Chart</th>
              <th className="text-left py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((candidate) => (
              <tr key={candidate.id} className="border-b">
                <td className="py-2">
                  {candidate.profile ? (
                    <img
                      src={candidate.profile}
                      alt={`${candidate.name}'s profile`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <MdOutlinePerson size={30} className="text-gray-400" />
                  )}
                </td>
                <td className="py-2">{candidate.name}</td>
                <td className="py-2">{candidate.party || "Independent"}</td>
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
                <td className="py-2">{candidate.voteCount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-sm text-gray-500 mt-4">
          Est. Votes Counted: 100% | Last Updated:{" "}
          {new Date(data.lastUpdated).toLocaleString("en-KE")}
        </p>

        <button
          onClick={() => window.print()}
          className="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        >
          Print Report
        </button>
      </div>

      {polls
        .filter((poll) => poll.id !== data.id)
        .map((poll) => (
          <PollResults key={poll.id} pollId={poll.id} />
        ))}
    </div>
  );
};

export default PollFullDetails;
