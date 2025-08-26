"use client";
import React, { useEffect, useState } from "react";
import AllPollsPage from "../components/AllPollsPage";
import AllApirantPollPage from "../components/AllAspirantPoll";
import { PlusCircle } from "lucide-react";

export default function HomePage() {
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="max-w-full mx-auto ">
      <div className="bg-white shadow-lg rounded-lg p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Active Polls</h2>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>{" "}
            <a
              href="/Login/update-admin"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Update profile
            </a>{" "}
            <a
              href="/BlogPostForm"
              className="flex items-center p-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition"
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
      <div>
        <AllPollsPage />
      </div>
      <div>
        {" "}
        <h1 className="flex text-4xl justify-center">All polling votes</h1>{" "}
        <AllApirantPollPage />
      </div>
    </div>
  );
}
