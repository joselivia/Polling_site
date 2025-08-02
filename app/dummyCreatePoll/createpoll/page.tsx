"use client";

import React, { useState } from "react";
import {
  CATEGORY_OPTIONS,
  countyAssemblyWardMap,
  countyConstituencyMap,
  Presidential_category,
  regionCountyMap,
} from "./Places";
import { useRouter } from "next/navigation";
import { baseURL } from "@/config/baseUrl";
import { Send, Megaphone } from "lucide-react";

const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [presidential, setPresidential] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expiry, setExpiry] = useState<string | null>(null);
  const router = useRouter();

  const counties = region ? regionCountyMap[region] : [];
  const constituencies = county ? countyConstituencyMap[county] : [];
  const wards = constituency ? countyAssemblyWardMap[constituency] : [];
  const showPresidentialExecutive = category === "Presidential";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");

    if (
      !title ||
      !category ||
      !region ||
      (showPresidentialExecutive && !presidential)
    ) {
      setMessage("❌ Please fill in all required poll details.");
      setSubmitting(false);
      return;
    }
    let expiryTimestamp: string | null = null;
    if (expiry) {
      const now = new Date();
      const hours = parseInt(expiry);
      if (!isNaN(hours)) {
        now.setHours(now.getHours() + hours);
        expiryTimestamp = now.toISOString();
      }
    }
    const payload = {
      title,
      category,
      presidential: showPresidentialExecutive ? presidential : null,
      region,
      county,
      constituency: constituency || null,
      ward: ward || null,
      voting_expires_at: expiryTimestamp,
    };

    try {
      const response = await fetch(`${baseURL}/api/polls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const pollId = result.id;
        setMessage(
          "✅ Poll created successfully! Redirecting to add survey questions..."
        );
        setTitle("");
        setPresidential("");
        setCategory("");
        setRegion("");
        setCounty("");
        setConstituency("");
        setWard("");
        setExpiry(null);
        setTimeout(() => {
          router.push(`/dummyCreatePoll/CreateQuiz?pollId=${pollId}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(
          `❌ Failed to create poll: ${
            errorData.message || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      setMessage("❌ Network or server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0 flex items-center">
          <Megaphone className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" />{" "}
          Create New Poll
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poll Details Section */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Poll Title <span className="text-red-500">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                placeholder="e.g., Enter Poll Title"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value !== "Presidential") {
                      setPresidential("");
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {showPresidentialExecutive && (
                <div>
                  <label
                    htmlFor="presidential"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Presidential Executive{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="presidential"
                    value={presidential}
                    onChange={(e) => setPresidential(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {Presidential_category.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Region <span className="text-red-500">*</span>
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCounty("");
                  setConstituency("");
                  setWard("");
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>
                  Select region
                </option>
                {Object.keys(regionCountyMap).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="county"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                County <span className="text-red-500">*</span>
              </label>
              <select
                id="county"
                value={county}
                onChange={(e) => {
                  setCounty(e.target.value);
                  setConstituency("");
                  setWard("");
                }}
                disabled={!region}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${
                  !region ? "opacity-60 cursor-not-allowed" : ""
                }`}
                required
              >
                <option value="" disabled>
                  Select county
                </option>
                {counties.map((cty) => (
                  <option key={cty} value={cty}>
                    {cty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="constituency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Constituency
              </label>
              <select
                id="constituency"
                value={constituency}
                onChange={(e) => {
                  setConstituency(e.target.value);
                  setWard("");
                }}
                disabled={!county}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${
                  !county ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <option value="" disabled>
                  Select Constituency
                </option>
                {constituencies.map((constituency) => (
                  <option key={constituency} value={constituency}>
                    {constituency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ward
              </label>
              <select
                id="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                disabled={!constituency}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${
                  !constituency ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <option value="" disabled>
                  Select Ward
                </option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
              Voting Expiry in Hours (optional)
            </label>
            <input
              type="number"
              id="expiry"
              min="1"
              placeholder="Enter duration in hours (e.g. 2, 24, 48)"
              value={expiry || ""}
              onChange={(e) => setExpiry(e.target.value ? e.target.value : null)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center justify-center px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                submitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
              }`}
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div>
                  <Send className="w-5 h-5 mr-2" /> Create Poll
                </div>
              )}
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`text-center mt-6 text-base font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreatePoll;
