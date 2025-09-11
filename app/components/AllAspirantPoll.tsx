"use client";
import React, { useState, useEffect } from "react";
import { baseURL } from "@/config/baseUrl";
import Link from "next/link";
import {
  Loader2,
  Frown,
  List,
  CalendarDays,
  MapPin,
  EllipsisVertical,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
interface Candidate {
  id?: number;
  name: string;
  party?: string;
  profile?: string | File | null;
}
interface Question {
  id?: number;
  question_text: string;
  type: string;
  is_competitor_question?: boolean;
}
interface PollData {
  id: number;
  title: string;
  presidential: string;
  category?: string;
  region: string;
  county?: string;
  constituency?: string;
  ward?: string;
  totalVotes: number;
  voting_expires_at: string;
  spoiled_votes?: number;
  results?: Candidate[];
  competitors?: Candidate[];
  questions?: Question[];
  published: boolean;
  created_at: Date | string;
}
const AllApirantPollPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingPoll, setEditingPoll] = useState<PollData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const fetchAllPolls = async () => {
    try {
      const response = await fetch(`${baseURL}/api/aspirant`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch polls.");
      }
      const data: PollData[] = await response.json();
      console.log(data);
      setPolls(data);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred while fetching polls."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPolls();
  }, []);

  // ✅ Delete poll
  const handleDelete = async (pollId: number) => {
    if (!confirm("Are you sure you want to delete this poll?")) return;
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${pollId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete poll.");
      }
      setPolls((prev) => prev.filter((p) => p.id !== pollId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ Edit poll
  const handleEditSubmit = async (id: number) => {
    if (!editingPoll) return;
    setSubmitting(true);
    let expiryValue=editingPoll.voting_expires_at;
      if (/^\d+$/.test(expiryValue)) {
    const hours = parseInt(expiryValue, 10);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + hours);
    expiryValue = expiryDate.toISOString(); // 
  }
    const formData = new FormData();
    formData.append("title", editingPoll.title);
    formData.append("presidential", editingPoll.presidential || "");
    formData.append("category", editingPoll.category || "");
    formData.append("region", editingPoll.region || "");
    formData.append("county", editingPoll.county || "");
    formData.append("constituency", editingPoll.constituency || "");
    formData.append("ward", editingPoll.ward || "");
    formData.append("voting_expires_at", expiryValue || "");
    editingPoll.questions?.forEach((q, i) => {
      formData.append(`questions[${i}][id]`, q.id ? String(q.id) : "");
      formData.append(`questions[${i}][question_text]`, q.question_text || "");
      formData.append(`questions[${i}][type]`, q.type || "text");
      formData.append(
        `questions[${i}][is_competitor_question]`,
        q.is_competitor_question ? "true" : "false"
      );
    });

    editingPoll.competitors?.forEach((comp, i) => {
      formData.append(`competitors[${i}][id]`, comp.id ? String(comp.id) : "");
      formData.append(`competitors[${i}][name]`, comp.name || "");
      formData.append(`competitors[${i}][party]`, comp.party || "");
      if (comp.profile instanceof File) {
        formData.append(`competitors[${i}][profile]`, comp.profile);
      }
    });
    console.log("FormData entries:", [...formData.entries()]);
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update poll");

      const updated = await res.json();
      console.log({voting_expires_at:updated.poll.voting_expires_at});
      setPolls((prev) =>
        prev.map((p) => (p.id === updated.poll.id ? updated.poll : p))
      );
      setEditingPoll(null);
      router.push("/Reports");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  const handleEdit = async (poll: PollData) => {
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${poll.id}`);
      if (!res.ok) throw new Error("Failed to fetch poll data");
      const data = await res.json();

      let competitorQ = null;
      try {
        const qRes = await fetch(`${baseURL}/api/votes/${poll.id}/questions`);
        if (qRes.ok) {
          const qData = await qRes.json();
          competitorQ = qData.find((q: any) => q.is_competitor_question);
        }
      } catch (err) {
        console.error("Error fetching competitor question:", err);
      }

      console.log("Fetched poll data:", data);

      setEditingPoll({
        ...data,
        competitors:
          data.competitors?.map((comp: Candidate) => ({
            ...comp,
            id: comp.id || null,
            profile: comp.profile || null,
          })) || [],
        questions: competitorQ
          ? [
              {
                id: competitorQ.id,
                question_text: competitorQ.question_text,
                type: competitorQ.type || "text",
                is_competitor_question: true,
              },
            ]
          : [],
      });
    } catch (err) {
      console.error("Failed to fetch poll with competitors:", err);
      alert("Failed to load poll for editing.");
    }
  };

  const togglePublish = async (id: number, published: boolean) => {
    try {
      const res = await fetch(`${baseURL}/api/aspirant/${id}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });

      if (!res.ok) throw new Error("Failed to update publish status");

      const updated = await res.json();
      setPolls((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, published: updated.published } : p
        )
      );
    } catch (err: any) {
      alert(err.message || "Failed to toggle publish status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        <p className="ml-4 text-xl text-gray-700">Loading polls...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Frown className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-red-700 font-semibold mb-2">Error:</p>
        <p className="text-lg text-red-600 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-3 lg:p-3 font-inter">
      <div className="mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
          <List className="mr-3 text-blue-600 w-10 h-10" /> All Available
          Aspirant Polls
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 group flex flex-col justify-between relative"
            >
                <>
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === poll.id ? null : poll.id)
                    }
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                  >
                    <EllipsisVertical className="text-gray-600 w-6 h-6" />
                  </button>
                  {menuOpenId === poll.id && (
                    <div className="absolute top-10 right-3 w-40 bg-white rounded-lg shadow-lg flex flex-col p-2 z-50 border">
                      <button
                        onClick={() => togglePublish(poll.id, poll.published)}
                        className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-200 rounded text-left"
                      >
                        {poll.published ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={() => {
                          handleEdit(poll);
                          setEditingPoll(poll);
                        }}
                        className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-200 rounded text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(poll.id)}
                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded text-left"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
    
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {poll.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">{poll.category}</span>
                  {poll.presidential && ` | ${poll.presidential}`}
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    Ward: {poll.ward || "N/A"}, Const:{" "}
                    {poll.constituency || "N/A"}, County: {poll.county || "N/A"}
                  </p>
                  <p className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                    Created: {new Date(poll.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                 <Link
                    href={`/vote/${poll.id}`}
                    className="block text-blue-600 font-semibold hover:underline flex-grow text-center py-2 px-3 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Vote
                  </Link>
                          <Link
                  href={`/fullvotes/${poll.id}`}
                  className="block text-indigo-600 font-semibold hover:underline flex-grow text-center py-2 px-3 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Aspirant results
                </Link>
              </div>
            </div>
          ))}
        </div>
        {editingPoll && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto transform scale-95 transition-transform duration-300">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4">
                Edit Poll Details
              </h2>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(editingPoll.id);
                }}
              >
                {/* Basic Poll Details Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Poll Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Poll Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={editingPoll.title}
                        onChange={(e) =>
                          setEditingPoll({
                            ...editingPoll,
                            title: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Nairobi Gubernatorial Poll"
                        required
                      />
                    </div>
                    {/* Category */}
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category
                      </label>
                      <input
                        id="category"
                        type="text"
                        value={editingPoll.category}
                        onChange={(e) =>
                          setEditingPoll({
                            ...editingPoll,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Governor"
                        required
                      />
                    </div>
                  </div>
                  {/* Presidential */}
                  <div className="mt-4">
                    <label
                      htmlFor="presidential"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Presidential
                    </label>
                    <input
                      id="presidential"
                      type="text"
                      value={editingPoll.presidential || ""}
                      onChange={(e) =>
                        setEditingPoll({
                          ...editingPoll,
                          presidential: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Presidential Poll"
                    />
                  </div>
                </div>

                {/* Geographic Details Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Geographic Location
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* County */}
                    <div>
                      <label
                        htmlFor="county"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        County
                      </label>
                      <input
                        id="county"
                        type="text"
                        value={editingPoll.county || ""}
                        onChange={(e) =>
                          setEditingPoll({
                            ...editingPoll,
                            county: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Nairobi"
                      />
                    </div>
                    {/* Constituency */}
                    <div>
                      <label
                        htmlFor="constituency"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Constituency
                      </label>
                      <input
                        id="constituency"
                        type="text"
                        value={editingPoll.constituency || ""}
                        onChange={(e) =>
                          setEditingPoll({
                            ...editingPoll,
                            constituency: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Kibra"
                      />
                    </div>
                    {/* Ward */}
                    <div>
                      <label
                        htmlFor="ward"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Ward
                      </label>
                      <input
                        id="ward"
                        type="text"
                        value={editingPoll.ward || ""}
                        onChange={(e) =>
                          setEditingPoll({
                            ...editingPoll,
                            ward: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Woodley"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h2>Voting Expiry hours</h2>
                  <div>
                    <input
                      id="expiry"
                      type="number"
                      value={editingPoll.voting_expires_at || ""}
                      onChange={(e) =>
                        setEditingPoll({
                          ...editingPoll,
                          voting_expires_at: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 24"
                    />
                  </div>
                </div>
                {/* Questions Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Competitor Questions
                  </h3>
                  <div className="space-y-4">
                    {editingPoll.questions
                      ?.filter((q) => q.is_competitor_question) // ✅ only competitor questions
                      .map((q, index) => (
                        <div
                          key={q.id ?? index}
                          className="flex-1 w-full space-y-2"
                        >
                          <input
                            type="text"
                            value={q.question_text || ""}
                            onChange={(e) => {
                              const newQuestions = [
                                ...(editingPoll.questions || []),
                              ];
                              const qIndex = newQuestions.findIndex(
                                (x) => x.id === q.id
                              );
                              newQuestions[qIndex].question_text =
                                e.target.value;
                              setEditingPoll({
                                ...editingPoll,
                                questions: newQuestions,
                              });
                            }}
                            placeholder="Competitor Question"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Competitors Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Competitors
                  </h3>
                  <div className="space-y-4">
                    {editingPoll.competitors?.map((comp, index) => (
                      <div
                        key={`${comp.id ?? "new"}-${index}`}
                        className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-white shadow-sm"
                      >
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            value={comp.name || ""}
                            onChange={(e) => {
                              const newComps = [
                                ...(editingPoll.competitors || []),
                              ];
                              newComps[index].name = e.target.value;
                              setEditingPoll({
                                ...editingPoll,
                                competitors: newComps,
                              });
                            }}
                            placeholder="Candidate Name"
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-indigo-500"
                            required
                          />
                          <input
                            type="text"
                            value={comp.party || ""}
                            onChange={(e) => {
                              const newComps = [
                                ...(editingPoll.competitors || []),
                              ];
                              newComps[index].party = e.target.value;
                              setEditingPoll({
                                ...editingPoll,
                                competitors: newComps,
                              });
                            }}
                            placeholder="Party Affiliation"
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex-shrink-0 w-full sm:w-auto">
                          <label className="block text-sm font-medium text-gray-700 sr-only">
                            Profile Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const newComps = [
                                  ...(editingPoll.competitors || []),
                                ];
                                newComps[index].profile = file;
                                setEditingPoll({
                                  ...editingPoll,
                                  competitors: newComps,
                                });
                              }
                            }}
                            className="hidden"
                            id={`profile-upload-${index}`}
                          />

                          <label
                            htmlFor={`profile-upload-${index}`}
                            className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-md shadow-sm cursor-pointer transition-colors w-full justify-center"
                          >
                            {comp.profile ? "Change Image" : "Upload Image"}
                          </label>
                          {comp.profile && (
                            <img
                              src={
                                comp.profile instanceof File
                                  ? URL.createObjectURL(comp.profile)
                                  : typeof comp.profile === "string" &&
                                    comp.profile.startsWith("data:")
                                  ? comp.profile
                                  : `data:image/jpeg;base64,${comp.profile}`
                              }
                              alt="Profile Preview"
                              className="mt-2 w-16 h-16 rounded-full object-cover mx-auto"
                            />
                          )}
                        </div>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 transition-colors p-2 -mr-2 sm:ml-auto"
                          onClick={() => {
                            setEditingPoll({
                              ...editingPoll,
                              competitors: editingPoll.competitors?.filter(
                                (_, i) => i !== index
                              ),
                            });
                          }}
                          aria-label="Remove competitor"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow"
                    onClick={() =>
                      setEditingPoll({
                        ...editingPoll,
                        competitors: [
                          ...(editingPoll.competitors || []),
                          { name: "", party: "", profile: null },
                        ],
                      })
                    }
                  >
                    + Add New Competitor
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setEditingPoll(null)}
                    className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex items-center justify-center px-8 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ${
                      submitting
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" /> Update Poll
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApirantPollPage;
