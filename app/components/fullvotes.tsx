"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Bar, BarChart, XAxis, YAxis } from "recharts";
import PollResults from "./pollResults";
import { baseURL } from "@/config/baseUrl"; 
import {
  BarChart2,
  PieChart as PieChartIcon,
  Info,
  Users,
  Clock,
  MapPin,
  Map,
  Building2,
  X,
  Printer,
  UserCircle2, 
  ListChecks,
} from "lucide-react";

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
  title: string;
  presidential?: string;
  category?: string;
  region: string;
  county?: string;
  constituency?: string;
  ward?: string;
  party?: string; 
  spoiled_votes?: number;
  totalVotes: number;
  results: Candidate[];
  lastUpdated: Date | string;
}

interface PollSummary {
  id: number;
  pollTitle: string;
  category?: string;
  region: string;
  totalVotes: number;
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
  "#ca8a04", 
  "#be123c", 
  "#16a34a", 
];

const PollFullDetails = ({ category, id }: PollFullDetailsProps) => {
  const [data, setData] = useState<PollData | null>(null);
  const [polls, setPolls] = useState<PollSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const res = await axios.get<PollData>(`${baseURL}/api/polls/${id}`);
          setData(res.data);
        } else if (category) {
          const res = await axios.get<PollSummary[]>(`${baseURL}/api/polls?category=${category}`);
          setPolls(res.data);
          if (res.data.length > 0) {
            const firstPoll = res.data[0];
            const detailsRes = await axios.get<PollData>(`${baseURL}/api/polls/${firstPoll.id}`);
            setData(detailsRes.data);
          } else {
            setData(null);
          }
        }
      } catch (err) {
        console.error("❌ Failed to load poll data:", err);
        setError("Failed to load poll data. Please try again later.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading poll details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg text-red-600">
          <X className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg text-gray-600">
          <Info className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium">No poll results found for this selection.</p>
        </div>
      </div>
    );
  }
  const chartData = data.results.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    votes: candidate.voteCount,
    percentage: parseFloat(candidate.percentage),
    profile: candidate.profile, 
    party: candidate.party,     
  }));

  const totalValidVotes = chartData.reduce((sum, c) => sum + c.votes, 0);
  const totalSpoiledVotes = data.spoiled_votes || 0;
  const totalAllVotes = totalValidVotes + totalSpoiledVotes;
  const turnoutPercentage = data.totalVotes > 0 ? ((totalAllVotes / data.totalVotes) * 100).toFixed(2) : "0.00";


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        {/* Header Section */}
        <div className="text-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 flex items-center justify-center">
            <BarChart2 className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" /> {data.title || "Poll Details"}
          </h1>
           <p className="text-gray-600 text-base sm:text-lg font-medium mb-1 flex items-center justify-center">
            <Info className="w-4 h-4 mr-2 text-gray-500" /> President Executive: <span className="font-semibold ml-1">{data.presidential || "N/A"}</span>
          </p>
          <p className="text-gray-600 text-base sm:text-lg font-medium mb-1 flex items-center justify-center">
            <Info className="w-4 h-4 mr-2 text-gray-500" /> Category: <span className="font-semibold ml-1">{data.category || "N/A"}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" /> Region: <span className="font-semibold ml-1">{data.region}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <Map className="w-4 h-4 mr-1 text-gray-500" /> County: <span className="font-semibold ml-1">{data.county || "N/A"}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <Building2 className="w-4 h-4 mr-1 text-gray-500" /> Constituency: <span className="font-semibold ml-1">{data.constituency || "N/A"}</span>
            </p>
             <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <Building2 className="w-4 h-4 mr-1 text-gray-500" /> Ward: <span className="font-semibold ml-1">{data.ward || "N/A"}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" /> Registered Voters: <span className="ml-1">{data.totalVotes.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <ListChecks className="w-5 h-5 mr-2 text-green-600" /> Total Valid Votes: <span className="ml-1">{totalValidVotes.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <X className="w-5 h-5 mr-2 text-red-600" /> Spoiled Votes: <span className="ml-1">{totalSpoiledVotes.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" /> Turnout: <span className="ml-1">{turnoutPercentage}%</span>
            </p>
          </div>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
          <div className="bg-gray-50 p-2 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2 text-purple-600" /> Vote
              Distribution
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
                  fill="#8884d8"
                  label={({ name, percentage }) =>
                    `${name} (${percentage.toFixed(1)}%)`
                  }
                  labelLine={false}
                >
                  {chartData.map((_,index) => (
                    <Cell
                      key={`pie-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number,name: string, props: any) => [
                    `${value.toLocaleString()} votes`,
                    props.payload.name,
                  ]}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ paddingLeft: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart Card */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-green-600" /> Votes by
              Candidate
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                />
                <XAxis
                  type="number"
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip
                  formatter={(value: number) =>
                    `${value.toLocaleString()} votes`
                  }
                />
                <Bar dataKey="votes" barSize={30} radius={[5, 5, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`bar-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* Detailed Results Table */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
          <ListChecks className="w-6 h-6 mr-2 text-blue-600" /> Candidate Performance
        </h3>
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 mb-8">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider rounded-tl-xl">Profile</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider">Candidate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider">Party</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider">Percentage (%)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider">Progress</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider rounded-tr-xl">Votes</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((candidate, index) => (
                <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4">
                    {candidate.profile ? (
                      <img
                        src={candidate.profile}
                        alt={`${candidate.name}'s profile`}
                        className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                      />
                    ) : (
                      <UserCircle2 size={36} className="text-gray-400" />
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{candidate.name}</td>
                  <td className="py-3 px-4 text-gray-700">{candidate.party || "Independent"}</td>
                  <td className="py-3 px-4 text-gray-700">{candidate.percentage.toFixed(2)}%</td>
                  <td className="py-3 px-4">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${candidate.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {candidate.votes.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Last Updated:{" "}
            <span className="font-semibold ml-1">{new Date(data.lastUpdated).toLocaleString("en-KE")}</span>
          </p>
          <button
            onClick={() => window.print()}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <Printer className="w-5 h-5 mr-2" /> Print Report
          </button>
        </div>
      </div>
      {polls.length > 0 && category && (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Other Polls in {category} Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {polls
              .filter((poll) => poll.id !== data.id) 
              .map((poll) => (
                <PollResults key={poll.id} pollId={poll.id} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PollFullDetails;
