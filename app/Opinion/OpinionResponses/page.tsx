"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { baseURL } from "@/config/baseUrl"; 
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';

interface SurveyQuestionAnswer {
  id: number;
  text: string;
  type: 'single_choice' | 'open_ended' | 'yes_no_not_sure';
  answer: string;
  options?: string[];
}

interface SurveyResponse {
  id: number;
  poll_id: number;
  name: string; 
  gender: string;
  age: number;
  answers: SurveyQuestionAnswer[];
  submitted_at: string;
}

interface PollDetails {
  id: number;
  title: string;
  category: string;
  presidential?: string;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  competitors: { id: number; name: string; party: string; profile?: string }[];
}

const QUESTION_TYPES = {
  SINGLE_CHOICE: 'single_choice' as const,
  OPEN_ENDED: 'open_ended' as const,
  YES_NO_NOT_SURE: 'yes_no_not_sure' as const,
};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57'];

const SurveyAnalytics: React.FC = () => {
  const searchParams = useSearchParams();
 const pollId = searchParams.get('pollId');
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [pollDetails, setPollDetails] = useState<PollDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pollId) {
      setError("No poll ID provided in the URL.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const pollResponse = await fetch(`${baseURL}/api/opinion_poll/${pollId}`);
        if (!pollResponse.ok) {
          throw new Error(`Failed to fetch poll details: ${pollResponse.statusText}`);
        }
       const pollData: PollDetails = await pollResponse.json();
       setPollDetails(pollData);
        const surveyResponse = await fetch(`${baseURL}/api/opinion_poll/${pollId}`);
        if (!surveyResponse.ok) {
          throw new Error(`Failed to fetch survey responses: ${surveyResponse.statusText}`);
        }
        const surveyData: SurveyResponse[] = await surveyResponse.json();
        setResponses(surveyData);

      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pollId]); 
  const {
    totalResponses,
    ageDistribution,
    competitorVotes,
    yesNoNotSureCounts,
    firstQuestionText,
    thirdQuestionText
  } = useMemo(() => {
    let total = responses.length;
    const ageGroups: { [key: string]: number } = {
      '18-25': 0, '26-35': 0, '36-45': 0, '46-55': 0, '56-65': 0, '66+': 0
    };
    const compVotes: { [key: string]: number } = {};
    const yesNoNotSure: { [key: string]: number } = { 'Yes': 0, 'No': 0, 'Not Sure': 0 };

    let q1Text = "N/A";
    let q3Text = "N/A";

    if (pollDetails && pollDetails.competitors) {
   
      pollDetails.competitors.forEach(comp => {
        compVotes[comp.name] = 0;
      });
    }

    responses.forEach(response => {
      const age = response.age;
      if (age >= 18 && age <= 25) ageGroups['18-25']++;
      else if (age >= 26 && age <= 35) ageGroups['26-35']++;
      else if (age >= 36 && age <= 45) ageGroups['36-45']++;
      else if (age >= 46 && age <= 55) ageGroups['46-55']++;
      else if (age >= 56 && age <= 65) ageGroups['56-65']++;
      else if (age >= 66) ageGroups['66+']++;

      response.answers.forEach(answer => {
        if (answer.id === 1 && answer.type === QUESTION_TYPES.SINGLE_CHOICE) {
          q1Text = answer.text; // Capture the actual question text
          if (compVotes[answer.answer] !== undefined) { // Ensure the answer maps to a known competitor
            compVotes[answer.answer]++;
          }
        } else if (answer.id === 3 && answer.type === QUESTION_TYPES.YES_NO_NOT_SURE) {
          q3Text = answer.text; // Capture the actual question text
          if (yesNoNotSure[answer.answer] !== undefined) {
            yesNoNotSure[answer.answer]++;
          }
        }
      });
    });

    const formattedAgeDistribution = Object.keys(ageGroups).map(key => ({
      ageGroup: key,
      count: ageGroups[key]
    }));

    const formattedCompetitorVotes = Object.keys(compVotes)
      .map(key => ({
        name: key,
        votes: compVotes[key]
      }))
      .filter(item => item.votes > 0); 
    const formattedYesNoNotSure = Object.keys(yesNoNotSure)
      .map(key => ({
        label: key,
        count: yesNoNotSure[key]
      }))
      .filter(item => item.count > 0); 

    return {
      totalResponses: total,
      ageDistribution: formattedAgeDistribution,
      competitorVotes: formattedCompetitorVotes,
      yesNoNotSureCounts: formattedYesNoNotSure,
      firstQuestionText: q1Text,
      thirdQuestionText: q3Text
    };
  }, [responses, pollDetails]); 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-blue-600 text-xl font-semibold">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-red-700 text-xl font-semibold p-4 rounded-lg bg-white shadow-md">
          {error}
        </div>
      </div>
    );
  }

  if (!pollDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600 text-xl font-semibold">Poll details not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 text-center">
          Poll Analytics: <span className="text-blue-700">{pollDetails.title}</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Insights from {totalResponses} survey responses
        </p>

        {totalResponses === 0 ? (
          <div className="text-center p-8 text-gray-600 text-xl">
            No survey responses recorded for this poll yet.
          </div>
        ) : (
          <div className="space-y-12">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col items-center">
                <Users className="w-10 h-10 text-blue-600 mb-3" />
                <p className="text-3xl font-bold text-blue-800">{totalResponses}</p>
                <p className="text-lg text-gray-600">Total Responses</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg shadow-md flex flex-col items-center">
                <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
                <p className="text-3xl font-bold text-green-800">
                  {pollDetails.category} Poll
                </p>
                <p className="text-lg text-gray-600">Category</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg shadow-md flex flex-col items-center">
                <BarChartIcon className="w-10 h-10 text-purple-600 mb-3" />
                <p className="text-3xl font-bold text-purple-800">
                  {pollDetails.region}
                </p>
                <p className="text-lg text-gray-600">Region</p>
              </div>
            </div>

            {/* Age Distribution Chart */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <BarChartIcon className="w-6 h-6 mr-2 text-blue-600" /> Age Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={ageDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="ageGroup" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip
                    formatter={(value: number) => [`${value} respondents`, 'Count']}
                    labelFormatter={(label: string) => `Age Group: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#4299e1" name="Number of Respondents" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Competitor Votes Chart (Pie Chart) */}
            {competitorVotes.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <PieChartIcon className="w-6 h-6 mr-2 text-green-600" /> {firstQuestionText}
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={competitorVotes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="votes"
                      nameKey="name"
                      // --- FIX 2: Handle potential undefined 'percent' ---
                      label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    >
                      {competitorVotes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} votes`, name]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            {yesNoNotSureCounts.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <PieChartIcon className="w-6 h-6 mr-2 text-purple-600" /> {thirdQuestionText}
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={yesNoNotSureCounts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="label"

                      label={({ label, percent }) => `${label} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    >
                      {yesNoNotSureCounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} responses`, name]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-gray-600" /> Raw Survey Responses
              </h3>
              <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {responses.map((response, index) => (
                  <div key={response.id} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <p className="font-semibold text-gray-700">Respondent {index + 1}:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      <li>Name: {response.name}</li>
                      <li>Gender: {response.gender}</li>
                      <li>Age: {response.age}</li>
                      <li>Submitted At: {new Date(response.submitted_at).toLocaleString()}</li>
                      <li className="font-semibold mt-2">Answers:</li>
                      <ul className="list-disc list-inside ml-4">
                        {response.answers.map((ans, ansIndex) => (
                          <li key={ansIndex}>
                            <span className="font-medium">{ans.text}:</span> {ans.answer || "N/A"}
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyAnalytics;