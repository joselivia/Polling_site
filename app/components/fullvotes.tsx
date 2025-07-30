"use client";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
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
import useSWR from "swr";

export interface Candidate {
  id: number;
  name: string;
  profile?: string;
  party?: string;
  voteCount: number;
  percentage: string;
}

export interface PollData {
  id: number;
  title: string;
  presidential:string;
  category?: string;
  region: string;
  county?: string;
  constituency?: string;
  ward?: string;
  totalVotes: number;
  spoiled_votes?: number;
  results: Candidate[];
  created_at: Date | string;
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FullPollDetails = ({ id }: { id?: number }) => {
  const { data, error, isLoading } = useSWR<PollData>(
    id ? `${baseURL}/aspirant/${id}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  if (isLoading) {
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
    console.error("Poll fetch error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg text-red-600">
          <X className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium">Failed to load poll data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg text-gray-600">
          <Info className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium">Poll data is unavailable. Please check the ID or try again later.</p>
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
  const turnoutPercentage =
    data.totalVotes > 0
      ? ((totalAllVotes / data.totalVotes) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        {/* Header Section */}
        <div className="text-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 flex items-center justify-center">
            <BarChart2 className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" />
            {data.title || "Poll Details"}
          </h1>
            <p className="text-gray-600 text-base sm:text-lg font-medium mb-1 flex items-center justify-center">
            <Info className="w-4 h-4 mr-2 text-gray-500" />
            Presidential Executive: <span className="font-semibold ml-1">{data.presidential || "N/A"}</span>
          </p>
          <p className="text-gray-600 text-base sm:text-lg font-medium mb-1 flex items-center justify-center">
            <Info className="w-4 h-4 mr-2 text-gray-500" />
            Category: <span className="font-semibold ml-1">{data.category || "N/A"}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" /> Region:
              <span className="font-semibold ml-1">{data.region}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <Map className="w-4 h-4 mr-1 text-gray-500" /> County:
              <span className="font-semibold ml-1">{data.county || "N/A"}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <Building2 className="w-4 h-4 mr-1 text-gray-500" /> Constituency:
              <span className="font-semibold ml-1">{data.constituency || "N/A"}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center">
              <Building2 className="w-4 h-4 mr-1 text-gray-500" /> Ward:
              <span className="font-semibold ml-1">{data.ward || "N/A"}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" /> Registered Voters:
              <span className="ml-1">{data.totalVotes.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <ListChecks className="w-5 h-5 mr-2 text-green-600" /> Total Valid Votes:
              <span className="ml-1">{totalValidVotes.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <X className="w-5 h-5 mr-2 text-red-600" /> Spoiled Votes:
              <span className="ml-1">{totalSpoiledVotes.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-base sm:text-lg font-semibold flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" /> Turnout:
              <span className="ml-1">{turnoutPercentage}%</span>
            </p>
          </div>
        </div>

        {/* Show message if no results yet */}
        {data.results.length === 0 ? (
          <div className="text-center text-gray-600 my-6 text-lg">
            No votes have been recorded yet for this poll.
          </div>
        ) : (
          <>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
              {/* Pie Chart */}
              <div className="bg-gray-50 p-2 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2 text-purple-600" />
                  Vote Distribution
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
                      label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                      labelLine={false}
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={`pie-cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string, props: any) => [
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

              {/* Bar Chart */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <BarChart2 className="w-5 h-5 mr-2 text-green-600" />
                  Votes by Candidate
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                    <XAxis type="number" tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} votes`} />
                    <Bar dataKey="votes" barSize={30} radius={[5, 5, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`bar-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Results Table */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center">
              <ListChecks className="w-6 h-6 mr-2 text-blue-600" /> Candidate Performance
            </h3>
            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 mb-8">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-left">Profile</th>
                    <th className="py-3 px-4 font-semibold text-left">Candidate</th>
                    <th className="py-3 px-4 font-semibold text-left">Party</th>
                    <th className="py-3 px-4 font-semibold text-left">Percentage</th>
                    <th className="py-3 px-4 font-semibold text-left">Progress</th>
                    <th className="py-3 px-4 font-semibold text-left">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((c, index) => (
                    <tr key={c.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        {c.profile ? (
                          <img
                            src={c.profile}
                            alt={c.name}
                            className="h-10 w-10 rounded-full border object-cover"
                          />
                        ) : (
                          <UserCircle2 size={36} className="text-gray-400" />
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{c.name}</td>
                      <td className="py-3 px-4 text-gray-700">{c.party || "Independent"}</td>
                      <td className="py-3 px-4 text-gray-700">{c.percentage.toFixed(2)}%</td>
                      <td className="py-3 px-4">
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${c.percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{c.votes.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Last Updated:
            <span className="font-semibold ml-1">
              {new Date(data.created_at).toLocaleString("en-KE")}
            </span>
          </p>
          <button
            onClick={() => window.print()}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <Printer className="w-5 h-5 mr-2" /> Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPollDetails;
