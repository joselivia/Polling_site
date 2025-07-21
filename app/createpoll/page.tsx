"use client";

import React, { useState } from "react";
import CustomPoll from "../customePoll/custompoll"; 
import {
  CATEGORY_OPTIONS,
  countyAssemblyWardMap,
  countyConstituencyMap,
  Presidential_category,
  regionCountyMap,
} from "./Places"; 
import { useRouter } from "next/navigation";
import { baseURL } from "@/config/baseUrl"; 
import { Plus, X, Upload, Send, Edit, SquarePen, Megaphone } from "lucide-react";

interface Competitor {
  name: string;
  party: string;
  profileFile: File | null;
}

const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [presidential, setPresidential] = useState(""); // Corrected typo: Presidential
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { name: "", party: "", profileFile: null },
  ]);
  const [message, setMessage] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const counties = region ? regionCountyMap[region] : [];
  const constituencies = county ? countyConstituencyMap[county] : [];
  const wards = constituency ? countyAssemblyWardMap[constituency] : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    const updated = [...competitors];
    updated[index].profileFile = file;
    setCompetitors(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");

    // Validation for poll details
    if (!title || !presidential || !category || !region || !county || !constituency || !ward) {
      setMessage("❌ Please fill in all required poll details.");
      setSubmitting(false);
      return;
    }

    // Validation for competitor details
    if (competitors.some(comp => !comp.name || !comp.party)) {
      setMessage("❌ Please fill in all competitor details.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("presidential", presidential); // Corrected typo
    formData.append("category", category);
    formData.append("region", region);
    formData.append("county", county);
    formData.append("constituency", constituency);
    formData.append("ward", ward);

    
    formData.append(
      "competitors",
      JSON.stringify(competitors.map(({ name, party }) => ({ name, party })))
    );

    competitors.forEach((competitor, index) => {
      if (competitor.profileFile) {
        formData.append(`profile${index}`, competitor.profileFile);
      }
    });

    try {
      const response = await fetch(`${baseURL}/api/polls`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("✅ Poll created successfully! Redirecting...");
        // Reset all form states on success
        setTitle("");
        setPresidential(""); // Corrected typo
        setCategory("");
        setRegion("");
        setCounty("");
        setConstituency("");
        setWard("");
        setCompetitors([{ name: "", party: "", profileFile: null }]);

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(`❌ Failed to create poll: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      setMessage("❌ Network or server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const addCompetitor = () => {
    setCompetitors([...competitors, { name: "", party: "", profileFile: null }]);
  };

  const removeCompetitor = (index: number) => {
    if (competitors.length === 1) {
      setMessage("⚠️ You must have at least one competitor.");
      return;
    }
    const newCompetitors = [...competitors];
    newCompetitors.splice(index, 1);
    setCompetitors(newCompetitors);
    setMessage("");
  };

  const updateCompetitor = (index: number, field: keyof Competitor, value: string | File | null) => {
    const updated = [...competitors];
    if (field === 'profileFile') {
      updated[index][field] = value as File | null;
    } else {
      updated[index][field] = value as string;
    }
    setCompetitors(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0 flex items-center">
            <Megaphone className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" /> Create New Poll
          </h2>
          <button
            onClick={() => setShowCustomForm(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 text-sm"
          >
            <SquarePen className="w-4 h-4 mr-2" /> Create Specific Poll
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poll Details Section */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Poll Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                placeholder="e.g., Presidential Election Poll"
                required
              />
            </div>
            <div>
              <label htmlFor="presidential" className="block text-sm font-medium text-gray-700 mb-2">
                Presidential Executive <span className="text-red-500">*</span>
              </label>
              <select
                id="presidential"
                value={presidential}
                onChange={(e) => setPresidential(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>Select a category</option>
                {Presidential_category.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>Select a category</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
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
                <option value="" disabled>Select region</option>
                {Object.keys(regionCountyMap).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
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
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!region ? 'opacity-60 cursor-not-allowed' : ''}`}
                required
              >
                <option value="" disabled>Select county</option>
                {counties.map((cty) => (
                  <option key={cty} value={cty}>
                    {cty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-2">
                Constituency <span className="text-red-500">*</span>
              </label>
              <select
                id="constituency"
                value={constituency}
                onChange={(e) => { setConstituency(e.target.value); setWard("") }}
                disabled={!county}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!county ? 'opacity-60 cursor-not-allowed' : ''}`}
                required
              >
                <option value="" disabled>Select Constituency</option>
                {constituencies.map((constituency) => (
                  <option key={constituency} value={constituency}>
                    {constituency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                Ward <span className="text-red-500">*</span>
              </label>
              <select
                id="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                disabled={!constituency}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!constituency ? 'opacity-60 cursor-not-allowed' : ''}`}
                required
              >
                <option value="" disabled>Select Ward</option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
          </div>

             {/* Competitors Section */}
          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Aspirant</h3>
          <div className="space-y-4">
            {competitors.map((comp, index) => (
              <div key={index} className="relative p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                {competitors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompetitor(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full bg-white shadow-sm"
                    title="Remove competitor"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <h4 className="text-lg font-medium text-gray-700 mb-3">Aspirant {index + 1}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`comp-name-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id={`comp-name-${index}`}
                      value={comp.name}
                      onChange={(e) => updateCompetitor(index, 'name', e.target.value)}
                      placeholder="Aspirant Name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`comp-party-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Party <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id={`comp-party-${index}`}
                      value={comp.party}
                      onChange={(e) => updateCompetitor(index, 'party', e.target.value)}
                      placeholder="Party Affiliation"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`profile-file-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Profile Image</label>
                    <label
                      htmlFor={`profile-file-${index}`}
                      className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-gray-700 text-sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {comp.profileFile ? comp.profileFile.name : 'Choose File'}
                    </label>
                    <input
                      type="file"
                      id={`profile-file-${index}`}
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      className="hidden" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              type="button"
              onClick={addCompetitor}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Competitor
            </button>

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
                <>
                  <Send className="w-5 h-5 mr-2" /> Submit Poll
                </>
              )}
            </button>
          </div>
        </form>
        {message && (
          <p className={`text-center mt-6 text-base font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
      {showCustomForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 scale-100 opacity-100">
            <button
              onClick={() => setShowCustomForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Edit className="mr-2 w-6 h-6 text-purple-600" /> Custom Poll Form
            </h3>
            <CustomPoll />
          </div>
        </div>
      )}
    </div>
  );
};
export default CreatePoll;