"use client";
import React from "react";
import AllPollsPage from "../components/AllPollsPage";
import AllApirantPollPage from "../components/AllAspirantPoll";
import { PlusCircle } from "lucide-react";

export default function HomePage() {
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-center sm:text-left">
            Active Polls
          </h2>

          {/* Responsive Button Container */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>

            <a
              href="/Login/update-admin"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update Profile
            </a>

            <a
              href="/BlogPostForm"
              className="flex items-center px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Blog
            </a>

            <a
              href="/dummyCreatePoll/createpoll"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              + Create Poll
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <AllPollsPage />
      </div>

      <div className="mt-10">
        <h1 className="flex text-3xl sm:text-4xl justify-center font-semibold mb-4">
          All Polling Votes
        </h1>
        <AllApirantPollPage />
      </div>
    </div>
  );
}
