"use client";

import React, { useReducer, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  X,
  Upload,
  Send,
  Megaphone,
  Radio,
  Type,
  HelpCircle,
  Users,
} from "lucide-react";
import { baseURL } from "@/config/baseUrl";
interface Aspirant {
  name: string;
  party: string;
  profileFile: File | null;
}

interface GenericOption {
  text: string;
}

interface SingleChoiceQuestion {
  id: string;
  type: "single-choice";
  questionText: string;
  options: GenericOption[];
  isCompetitorQuestion?: boolean;
}

interface OpenEndedQuestion {
  id: string;
  type: "open-ended";
  questionText: string;
}

interface YesNoNotSureQuestion {
  id: string;
  type: "yes-no-notsure";
  questionText: string;
  fixedOptions: string[];
}

type PollQuestion =
  | SingleChoiceQuestion
  | OpenEndedQuestion
  | YesNoNotSureQuestion;

type State = {
  pollId: string | null;
  mainAspirants: Aspirant[];
  dynamicQuestions: PollQuestion[];
  message: string;
  submitting: boolean;
};

type Action =
  | { type: "SET_POLL_ID"; payload: string | null }
  | { type: "ADD_ASPIRANT" }
  | { type: "REMOVE_ASPIRANT"; payload: number }
  | { type: "UPDATE_ASPIRANT"; payload: { index: number; field: keyof Aspirant; value: string | File | null } }
  | { type: "ADD_QUESTION"; payload: PollQuestion }
  | { type: "REMOVE_QUESTION"; payload: string }
  | { type: "UPDATE_QUESTION_TEXT"; payload: { id: string; newText: string } }
  | { type: "ADD_OPTION"; payload: string }
  | { type: "REMOVE_OPTION"; payload: { questionId: string; optionIndex: number } }
  | { type: "UPDATE_OPTION"; payload: { questionId: string; optionIndex: number; newText: string } }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET_FORM" };

// --- Reducer Function ---
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_POLL_ID":
      return { ...state, pollId: action.payload };

    case "ADD_ASPIRANT":
      return {
        ...state,
        mainAspirants: [...state.mainAspirants, { name: "", party: "", profileFile: null }],
        message: "",
      };

    case "REMOVE_ASPIRANT":
      if (state.mainAspirants.length <= 1) {
        return {
          ...state,
          message: "⚠️ You must have at least one aspirant.",
        };
      }
      const newAspirants = state.mainAspirants.filter(
        (_, i) => i !== action.payload
      );
      return { ...state, mainAspirants: newAspirants, message: "" };

    case "UPDATE_ASPIRANT":
      const updatedAspirants = state.mainAspirants.map((asp, i) =>
        i === action.payload.index ? { ...asp, [action.payload.field]: action.payload.value } : asp
      );

      // Also update competitor-choice questions
      const updatedQuestionsForAspirantChange = state.dynamicQuestions.map(q => {
        if (q.type === 'single-choice' && q.isCompetitorQuestion) {
          const newOptions = updatedAspirants.map(asp => ({ text: asp.name }));
          return { ...q, options: newOptions };
        }
        return q;
      });

      return { ...state, mainAspirants: updatedAspirants, dynamicQuestions: updatedQuestionsForAspirantChange };

    case "ADD_QUESTION":
      return {
        ...state,
        dynamicQuestions: [...state.dynamicQuestions, action.payload],
        message: "",
      };

    case "REMOVE_QUESTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.filter(
          (q) => q.id !== action.payload
        ),
      };

    case "UPDATE_QUESTION_TEXT":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) =>
          q.id === action.payload.id ? { ...q, questionText: action.payload.newText } : q
        ),
      };

    case "ADD_OPTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) => {
          if (q.id === action.payload && q.type === "single-choice" && !q.isCompetitorQuestion) {
            return {
              ...q,
              options: [...q.options, { text: "" }],
            };
          }
          return q;
        }) as PollQuestion[],
      };

    case "REMOVE_OPTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) => {
          if (q.id === action.payload.questionId && q.type === "single-choice" && !q.isCompetitorQuestion) {
            if (q.options.length <= 1) {
              return q;
            }
            return {
              ...q,
              options: q.options.filter(
                (_, i) => i !== action.payload.optionIndex
              ),
            };
          }
          return q;
        }) as PollQuestion[],
      };

    case "UPDATE_OPTION":
      return {
        ...state,
        dynamicQuestions: state.dynamicQuestions.map((q) => {
          if (q.id === action.payload.questionId && q.type === "single-choice" && !q.isCompetitorQuestion) {
            const updatedOptions = [...q.options];
            updatedOptions[action.payload.optionIndex] = {
              text: action.payload.newText,
            };
            return { ...q, options: updatedOptions };
          }
          return q;
        }) as PollQuestion[],
      };

    case "SET_MESSAGE":
      return { ...state, message: action.payload };

    case "SET_SUBMITTING":
      return { ...state, submitting: action.payload };

    case "RESET_FORM":
      return {
        ...state,
        mainAspirants: [{ name: "", party: "", profileFile: null }],
        dynamicQuestions: [],
        message: "",
      };

    default:
      return state;
  }
};

const initialState: State = {
  pollId: null,
  mainAspirants: [{ name: "", party: "", profileFile: null }],
  dynamicQuestions: [],
  message: "",
  submitting: false,
};
const CreateQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = searchParams.get("pollId");
    if (id) {
      dispatch({ type: "SET_POLL_ID", payload: id });
    } else {
      dispatch({ type: "SET_MESSAGE", payload: "❌ No poll ID provided. Redirecting..." });
      setTimeout(() => router.push("/create-poll"), 1500);
    }
  }, [searchParams, router]);

  const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

  const handleAddQuestion = (
    type: "single-choice" | "open-ended" | "yes-no-notsure" | "competitor-choice"
  ) => {
    let newQuestion: PollQuestion;
    const id = generateUniqueId();

    if (type === "single-choice") {
      newQuestion = {
        id,
        type: "single-choice",
        questionText: "",
        options: [{ text: "" }],
      };
    } else if (type === "open-ended") {
      newQuestion = { id, type: "open-ended", questionText: "" };
    } else if (type === "yes-no-notsure") {
      newQuestion = {
        id,
        type: "yes-no-notsure",
        questionText: "",
        fixedOptions: ["Yes", "No", "Not Sure"],
      };
    } else {
      if (state.mainAspirants.some(a => !a.name.trim())) {
        dispatch({
          type: "SET_MESSAGE",
          payload: "⚠️ Please fill in all aspirant names before adding this question.",
        });
        return;
      }
      newQuestion = {
        id,
        type: "single-choice",
        questionText: "",
        options: state.mainAspirants.map((comp) => ({ text: comp.name })),
        isCompetitorQuestion: true,
      };
    }
    dispatch({ type: "ADD_QUESTION", payload: newQuestion });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_SUBMITTING", payload: true });
    dispatch({ type: "SET_MESSAGE", payload: "" });

    // Validation
    if (!state.pollId) {
      dispatch({ type: "SET_MESSAGE", payload: "❌ Poll ID is missing." });
      dispatch({ type: "SET_SUBMITTING", payload: false });
      return;
    }

    if (state.mainAspirants.some((comp) => !comp.name.trim())) {
      dispatch({ type: "SET_MESSAGE", payload: "❌ Please fill in all aspirant names." });
      dispatch({ type: "SET_SUBMITTING", payload: false });
      return;
    }

    const dynamicQuestionsValid = state.dynamicQuestions.every((q) => {
      if (!q.questionText.trim()) return false;
      if (q.type === "single-choice" && !q.isCompetitorQuestion && q.options.some((opt) => !opt.text.trim()))
        return false;
      return true;
    });

    if (!dynamicQuestionsValid) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "❌ Please ensure all questions and options are filled out.",
      });
      dispatch({ type: "SET_SUBMITTING", payload: false });
      return;
    }

    const formData = new FormData();
    formData.append("pollId", state.pollId);
    formData.append(
      "mainCompetitors",
      JSON.stringify(state.mainAspirants.map(({ name, party }) => ({ name, party })))
    );

    state.mainAspirants.forEach((aspirant, index) => {
      if (aspirant.profileFile) {
        formData.append(`mainProfile-${index}`, aspirant.profileFile);
      }
    });

    const dynamicQuestionsForBackend = state.dynamicQuestions.map((q) => {
      if (q.type === "single-choice") {
        return {
          id: q.id,
          type: q.type,
          questionText: q.questionText,
          options: q.options.map((opt) => opt.text),
          isCompetitorQuestion: (q as SingleChoiceQuestion).isCompetitorQuestion || false,
        };
      } else if (q.type === "yes-no-notsure") {
        return {
          id: q.id,
          type: q.type,
          questionText: q.questionText,
          options: q.fixedOptions,
        };
      }
      return q;
    });

    formData.append("dynamicPollQuestions", JSON.stringify(dynamicQuestionsForBackend));

    try {
      const response = await fetch(`${baseURL}/api/polls/createQuiz`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        dispatch({ type: "SET_MESSAGE", payload: "✅ Poll questions and aspirants saved successfully!" });
        setTimeout(() => router.push(`/PollVoting/${state.pollId}`), 1500);
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SET_MESSAGE",
          payload: `❌ Failed to save quiz data: ${errorData.message || response.statusText}`,
        });
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      dispatch({ type: "SET_MESSAGE", payload: "❌ Network or server error. Please try again." });
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  // --- JSX Rendering ---
  if (!state.pollId && !state.message.includes("No poll ID provided")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-xl text-gray-700">Loading poll details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0 flex items-center">
          <Megaphone className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" /> Add Questions to Poll ID: {state.pollId}
        </h2>
        {state.message.includes("No poll ID provided") ? (
          <p className="text-center mt-6 font-medium text-red-600">{state.message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pb-28">
            <AspirantSection
              aspirants={state.mainAspirants}
              dispatch={dispatch}
            />
            {state.dynamicQuestions.map((question, index) => (
              <DynamicQuestionSection
                key={question.id}
                question={question}
                index={index}
                dispatch={dispatch}
                mainAspirants={state.mainAspirants}
              />
            ))}
            <FixedQuestionBar handleAddQuestion={handleAddQuestion} submitting={state.submitting} />
          </form>
        )}
        {state.message && (
          <p className={`text-center mt-6 font-medium ${state.message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
};

// --- Reusable Sub-Components ---

const AspirantSection: React.FC<{
  aspirants: Aspirant[];
  dispatch: React.Dispatch<Action>;
}> = ({ aspirants, dispatch }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Aspirants for Main Poll</h3>
    <div className="space-y-4">
      {aspirants.map((comp, index) => (
        <div key={index} className="relative p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
          {aspirants.length > 1 && (
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_ASPIRANT", payload: index })}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors p-1 rounded-full bg-white shadow-sm"
              title="Remove aspirant"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <h4 className="text-lg font-medium text-gray-700 mb-3">Aspirant {index + 1}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor={`main-comp-name-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id={`main-comp-name-${index}`}
                value={comp.name}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_ASPIRANT", payload: { index, field: "name", value: e.target.value } })
                }
                placeholder="Aspirant Name"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor={`main-comp-party-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Party</label>
              <input
                type="text"
                id={`main-comp-party-${index}`}
                value={comp.party}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_ASPIRANT", payload: { index, field: "party", value: e.target.value } })
                }
                placeholder="Party Affiliation/Independent"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
            </div>
            <div>
              <label htmlFor={`main-profile-file-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Profile Image</label>
              <label
                htmlFor={`main-profile-file-${index}`}
                className="flex items-center justify-center w-full p-2 border rounded-md bg-white cursor-pointer hover:bg-gray-100 transition text-gray-700 text-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                {comp.profileFile ? comp.profileFile.name : 'Choose File'}
              </label>
              <input
                type="file"
                id={`main-profile-file-${index}`}
                accept="image/*"
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ASPIRANT",
                    payload: { index, field: "profileFile", value: e.target.files ? e.target.files[0] : null },
                  })
                }
                className="hidden"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-4">
      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_ASPIRANT" })}
        className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
      >
        <Plus className="w-5 h-5 mr-2" /> Add Aspirant
      </button>
    </div>
  </div>
);

const DynamicQuestionSection: React.FC<{
  question: PollQuestion;
  index: number;
  dispatch: React.Dispatch<Action>;
  mainAspirants: Aspirant[];
}> = ({ question, index, dispatch, mainAspirants }) => (
  <div className="relative p-6 border rounded-xl shadow-lg bg-white mb-6">
    <button
      type="button"
      onClick={() => dispatch({ type: "REMOVE_QUESTION", payload: question.id })}
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-2 rounded-full bg-white shadow-sm"
      title="Remove question"
    >
      <X className="w-6 h-6" />
    </button>
    <h4 className="text-lg font-bold text-gray-800 mb-4">
      {`Additional Question ${index + 1}: `}
      <span className="text-blue-600 capitalize">
        {question.type === "single-choice" && (question as SingleChoiceQuestion).isCompetitorQuestion
          ? "Competitor Choice"
          : question.type.replace("-", " ")}
      </span>
    </h4>
    <div className="mb-4">
      <label htmlFor={`dynamic-question-text-${question.id}`} className="block text-sm font-medium text-gray-700 mb-2">
        Question Text <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id={`dynamic-question-text-${question.id}`}
        value={question.questionText}
        onChange={(e) =>
          dispatch({ type: "UPDATE_QUESTION_TEXT", payload: { id: question.id, newText: e.target.value } })
        }
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
        placeholder={`Enter your ${question.type.replace("-", " ")} question here`}
        required
      />
    </div>

    {question.type === "single-choice" &&
      ((question as SingleChoiceQuestion).isCompetitorQuestion ? (
        <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Options (Aspirants)</h5>
          <div className="flex flex-wrap gap-2">
            {mainAspirants.length > 0 ? (
              mainAspirants.map((comp, oIndex) => (
                <span key={oIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  {comp.name}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No aspirants added yet. Add aspirants above to see options here.</p>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">These options are automatically populated from the main aspirants list.</p>
        </div>
      ) : (
        <div className="space-y-4 border-t pt-4 mt-4 border-gray-100">
          {(question as SingleChoiceQuestion).options.map((option, oIndex) => (
            <div key={oIndex} className="relative p-4 border rounded-lg bg-gray-50 shadow-sm">
              {(question as SingleChoiceQuestion).options.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_OPTION",
                      payload: { questionId: question.id, optionIndex: oIndex },
                    })
                  }
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1 rounded-full bg-white shadow-sm"
                  title="Remove option"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <h6 className="text-sm font-medium text-gray-600 mb-2">Option {oIndex + 1}</h6>
              <input
                type="text"
                value={option.text}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_OPTION",
                    payload: { questionId: question.id, optionIndex: oIndex, newText: e.target.value },
                  })
                }
                placeholder="Enter option text"
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_OPTION", payload: question.id })}
            className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Option
          </button>
        </div>
      ))}
    {question.type === "yes-no-notsure" && (
      <div className="space-y-3 border-t pt-4 mt-4 border-gray-100">
        <div className="flex flex-wrap gap-3">
          {(question as YesNoNotSureQuestion).fixedOptions.map((optionText, oIndex) => (
            <span key={oIndex} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm text-sm font-medium">
              {optionText}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const FixedQuestionBar: React.FC<{
  handleAddQuestion: (type: "single-choice" | "open-ended" | "yes-no-notsure" | "competitor-choice") => void;
  submitting: boolean;
}> = ({ handleAddQuestion, submitting }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => handleAddQuestion("single-choice")}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 text-sm"
        >
          <Radio className="w-4 h-4 mr-2" /> Single Choice
        </button>
        <button
          type="button"
          onClick={() => handleAddQuestion("open-ended")}
          className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition transform hover:scale-105 text-sm"
        >
          <Type className="w-4 h-4 mr-2" /> Open-Ended
        </button>
        <button
          type="button"
          onClick={() => handleAddQuestion("yes-no-notsure")}
          className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105 text-sm"
        >
          <HelpCircle className="w-4 h-4 mr-2" /> Yes/No/Not Sure
        </button>
        <button
          type="button"
          onClick={() => handleAddQuestion("competitor-choice")}
          className="flex items-center justify-center px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition transform hover:scale-105 text-sm"
        >
          <Users className="w-4 h-4 mr-2" /> Competitor Question
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`flex items-center justify-center px-6 py-3 text-lg font-bold rounded-lg shadow-xl transition transform hover:scale-105 w-full sm:w-auto ${
          submitting
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
        }`}
      >
        {submitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Submitting Poll...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 " /> Submit Survey
          </div>
        )}
      </button>
    </div>
  </div>
);

export default CreateQuiz;