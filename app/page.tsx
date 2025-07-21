"use client";

import React, { useEffect, useState } from "react";
import PollResults from "./components/pollResults";
import axios from "axios";
import BlogListPage from "./components/Blogs";
import { baseURL } from "@/config/baseUrl";
import SurveyForm from "./createpoll/survey";

export interface PollSummary {
  id: number;
  title: string;
  lastUpdated: Date | string;
}

export default function Home() {
  const [polls, setPolls] = useState<PollSummary[]>([]);

  useEffect(() => {
    const fetchPolls = () => {
      axios
        .get(`${baseURL}/api/polls`)
        .then((res) => setPolls(res.data as PollSummary[]))
        .catch((err) => console.error(err));
    };
    fetchPolls();
    const interval = setInterval(fetchPolls, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-full mx-auto ">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 w-full">
          <div className="bg-white shadow-lg rounded-lg p-4">
           <BlogListPage />   <SurveyForm />
          </div>
        </div>

        <div className="lg:w-2/3 w-full">
          <div className="bg-white shadow-lg rounded-lg p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Polls</h2>
              <a
                href="/createpoll"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                + Create Poll
              </a>
            </div>

            {polls.length > 0 ? (
              polls.map((poll) => (
                <PollResults key={poll.id} pollId={poll.id} />
              ))
            ) : (
              <p className="text-gray-600">No polls found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
