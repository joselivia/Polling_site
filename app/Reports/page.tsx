"use client";
import React from "react";
import BlogListPage from "../components/Blogs";
import AllPollsPage from "../components/AllPollsPage";

export interface PollSummary {
  id: number;
  title: string;
  lastUpdated: Date | string;
}

export default function HomePage() {
  return (
    <div className="max-w-full mx-auto ">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 w-full">
          <div className="bg-white shadow-lg rounded-lg p-4">
           <BlogListPage />  
          </div>
                </div>

        <div className="lg:w-2/3 w-full">
          <div className="bg-white shadow-lg rounded-lg p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Polls</h2> 
              <a
                href="/dummyCreatePoll/createpoll"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                + Create Poll
              </a>
            </div>

          </div>
           < AllPollsPage />      
        </div>

      </div>
    </div>
  );
}
