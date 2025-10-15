"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/baseUrl";
import { useRouter } from "next/navigation";

interface Candidate {
  id: number;
  name: string;
}

 interface PollData {
  title: string;
  results: Candidate[];
  voting_expires_at: string;
  voting_id: string;
  created_at: Date | string;
  allow_multiple_votes?: boolean;
}

const VoteInterface = ({ id }: { id: number }) => {
  const [data, setData] = useState<PollData | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [competitorQuestion, setCompetitorQuestion] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [voterId, setVoterId] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localAllowMultipleVotes, setLocalAllowMultipleVotes] = useState<boolean | null>(null);
const router=useRouter();
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("voter_id");
    if (!storedId) {
      const newId = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("voter_id", newId);
      setVoterId(newId);
    } else {
      setVoterId(storedId);
    }
  }, []);

  useEffect(() => {
    if (!voterId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/aspirant/${id}`);
        const fetchedData = res.data as PollData;
        setData((prev) => ({
          ...fetchedData,
          allow_multiple_votes:
            localAllowMultipleVotes !== null
              ? localAllowMultipleVotes
              : fetchedData.allow_multiple_votes,
        }));
      } catch (err) {
        console.error("Error fetching poll data:", err);
      }
    };

    const fetchCompetitorQuestion = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/votes/${id}/questions`);
        const question = res.data.find((q: any) => q.is_competitor_question);
        setCompetitorQuestion(question?.question_text || null);
      } catch (err) {
        console.error("Error fetching competitor question:", err);
      }
    };

    const checkIfVoted = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/votes/status`, {
          params: { pollId: id, voter_id: voterId },
        });

        if (res.data.alreadyVoted && !data?.allow_multiple_votes) {
          setMessage("You have already voted in this poll.");
        }
      } catch (err) {
        console.error("Error checking vote status:", err);
      }
    };

    fetchData();
    fetchCompetitorQuestion();
    if (!data?.allow_multiple_votes) {
      checkIfVoted();
    }

    const interval = setInterval(() => {
      fetchData();
      fetchCompetitorQuestion();
    }, 5000);

    return () => clearInterval(interval);
  }, [id, voterId, data?.allow_multiple_votes, localAllowMultipleVotes]);

  useEffect(() => {
    if (!data?.voting_expires_at) return;

    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(data.voting_expires_at);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Voting closed");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.voting_expires_at]);

  const handleVote = async () => {
    if (!selectedCandidateId || !data || !voterId) return;

    setIsVoting(true);
    setMessage(null);

    try {
      const response = await axios.post(`${baseURL}/api/votes`, {
        id,
        competitorId: selectedCandidateId,
        voter_id: voterId,
      });

      if (response.status === 200) {
        setMessage("Vote recorded successfully!");
        setSelectedCandidateId(null);
     if (!isAdmin) {
          setTimeout(() => router.replace("/Thankyou"), 1000);
        }
       }
    } catch (error: any) {
    if (!isAdmin && axios.isAxiosError(error) && error.response?.status === 403) {
      setMessage("You have already voted in this poll.");
    } else {
        console.error("Error voting:", error);
        setMessage("Failed to record vote. Please try again.");
      }
    } finally {
      setIsVoting(false);
    }
  };

  const toggleMultipleVoting = async () => {
    if (!data) return;
    try {
      const updated = !data.allow_multiple_votes;
      await axios.patch(`${baseURL}/api/votes/${id}/allow-multiple`, {
        allow_multiple_votes: updated,
      });
      setLocalAllowMultipleVotes(updated);
      setData({ ...data, allow_multiple_votes: updated });
      setMessage(
        updated ? "Multiple voting enabled" : "Multiple voting disabled"
      );
    } catch (err) {
      console.error("Error toggling multiple voting:", err);
      setMessage("Failed to update voting mode.");
    }
  };

  if (!data) return <p className="text-center p-4">Loading poll data...</p>;

  const isVotingClosed = countdown === "Voting closed";
  if (isVotingClosed) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <p className="text-red-600 text-center text-xl font-semibold">
          Voting closed
        </p>
      </div>
    );
  }

  const hasVoted =
    !data.allow_multiple_votes &&
    message === "You have already voted in this poll.";

  return (
    <div className="max-w-lg mx-auto p-4 min-h-screen">
      <div className="flex justify-center items-center space-x-2.5">
        <h1 className="text-2xl font-bold text-center">{data.title || "Cast Your Vote"}</h1>
        {mounted && isAdmin && (
          <div className="text-center mt-2">
            <button
              onClick={toggleMultipleVoting}
              className={`px-4 py-2 text-sm rounded-full font-medium ${
                data.allow_multiple_votes ? "bg-blue-600" : "bg-gray-500"
              } text-white hover:opacity-90`}
            >
              {data.allow_multiple_votes
                ? "Disable Call Centre"
                : "Enable Call Centre"}
            </button>
          </div>
        )}
      </div>
      <p className="text-red-600 text-center mb-4">
        Voting closes in: {countdown || "Not Set"}
      </p>

      {hasVoted ? (
        <p className="text-center text-red-500 font-semibold">{message}</p>
      ) : (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">{competitorQuestion || "Select Your Competitor"}</h2>
          <p className="text-sm text-gray-500">
            Last Updated:{" "}
            {new Date(data.created_at).toLocaleString("en-US", {
              timeZone: "Africa/Nairobi",
            })}
          </p>

          <div className="mt-4 space-y-2">
            {data.results.map((candidate) => (
              <div key={candidate.id} className="flex items-center">
                <input
                  type="radio"
                  id={`candidate-${candidate.id}`}
                  name="candidate"
                  value={candidate.id}
                  checked={selectedCandidateId === candidate.id}
                  onChange={() => setSelectedCandidateId(candidate.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  disabled={isVoting || isVotingClosed}
                />
                <label
                  htmlFor={`candidate-${candidate.id}`}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {candidate.name}
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleVote}
            disabled={isVoting || !selectedCandidateId || isVotingClosed}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isVoting ? "Voting..." : "Submit Vote"}
          </button>

          {message && (
            <p className="mt-2 text-center text-sm text-green-600">{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoteInterface;