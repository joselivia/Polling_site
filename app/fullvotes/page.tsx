"use client";
import {  useEffect, useState } from "react";
import FullPollDetails from "../components/fullvotes";
import { baseURL } from "@/config/baseUrl";

export interface PollSummary {
  id: number;
  title: string;
  created_at: Date | string;
}

export default function fullvotesSuspense() {
  const [latestPollId, setLatestPollId] = useState<number | null>(null);


 useEffect(() => {
    const fetchLatestPoll = async () => {
      try {
const res = await fetch(`${baseURL}/aspirant`);
  const polls: PollSummary[] = await res.json();
        if (polls.length > 0) {
          setLatestPollId(polls[0].id); 
        }
      } catch (err) {
        console.error("Failed to load polls:", err);
      }
    };

    fetchLatestPoll();
  }, []);
  

  return (
    <div className="p-4">
      { latestPollId ? (
        <FullPollDetails id={latestPollId} />
      ) : (
        <p className="text-gray-600 text-center mt-10">No active polls</p>
      )}
    </div>
  );
}
