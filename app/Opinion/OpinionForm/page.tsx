"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import { baseURL } from "@/config/baseUrl"; 

interface SurveyQuestion {
  id: number;
  type: 'single_choice' | 'open_ended' | 'yes_no_not_sure';
  text: string;
  options?: string[];
  answer: string;
}

interface PollDetails {
  id: number;
  title: string;
  category: string;
  presidential?: string; 
  region: string;
  county: string;
  constituency: string;
  ward: string;
  competitors: { id: number; name: string; party: string; profile?: string }[]; 
}

const QUESTION_TYPES = {
  SINGLE_CHOICE: 'single_choice' as const,
  OPEN_ENDED: 'open_ended' as const,
  YES_NO_NOT_SURE: 'yes_no_not_sure' as const,
};

const SurveyForm: React.FC = () => {
  const searchParams = useSearchParams();
  const pollId = searchParams.get('id'); 

  const [name, setName] = useState<string>('');
  const [respondentGender, setRespondentGender] = useState<string>('');
  const [respondentAge, setRespondentAge] = useState<string>('');
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]); 
  const [pollDetails, setPollDetails] = useState<PollDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); 

  const ageOptions: number[] = Array.from({ length: 83 }, (_, i) => i + 18);
  useEffect(() => {
    console.log("Poll ID from URL:", pollId);
    if (!pollId) {
      setError("No poll ID provided in the URL.");
      setLoading(false);
      return;
    }

    const fetchPollDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${baseURL}/api/polls/${pollId}`);
        console.log("Fetching poll details from:", `${baseURL}/api/polls/${pollId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch poll details: ${response.statusText}`);
        }
        const data: PollDetails = await response.json();
        setPollDetails(data);
        const initialQuestions: SurveyQuestion[] = [
          {
            id: 1,
            type: QUESTION_TYPES.SINGLE_CHOICE,
            text: `If elections were held today, who would you vote as the ${data.category} in the coming 2027 general elections?`,
          options: (data.competitors || []).map(comp => comp.name),
            answer: ""
          },
          {
            id: 2,
            type: QUESTION_TYPES.OPEN_ENDED,
            text: "Why would you vote for the aspirant you've chosen above?",
            answer: ""
          },
          {
            id: 3,
            type: QUESTION_TYPES.YES_NO_NOT_SURE,
            text: `Do you think ${data.category} ${data.presidential || data.title} has fulfilled their promises?`, 
            options: ["Yes", "No", "Not Sure"],
            answer: ""
          }
        ];
        setQuestions(initialQuestions);

      } catch (err: any) {
        console.error("Error fetching poll details:", err);
        setError(err.message || "An error occurred while loading poll details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPollDetails();
  }, [pollId]); 

  const handleQuestionAnswerChange = (id: number, newAnswer: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === id ? { ...q, answer: newAnswer } : q
      )
    );
  };

  const addQuestion = (type: SurveyQuestion['type']) => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    let newQuestion: SurveyQuestion = {
      id: newId,
      type: type,
      text: "",
      answer: ""
    };

    if (type === QUESTION_TYPES.SINGLE_CHOICE) {
      newQuestion.options = ["Option 1", "Option 2"];
    } else if (type === QUESTION_TYPES.YES_NO_NOT_SURE) {
      newQuestion.options = ["Yes", "No", "Not Sure"];
    }

    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const updateQuestionText = (id: number, newText: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === id ? { ...q, text: newText } : q
      )
    );
  };

  const updateQuestionOption = (questionId: number, optionIndex: number, newOptionText: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId && q.options) {
          const updatedOptions = [...q.options];
          updatedOptions[optionIndex] = newOptionText;
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  const addOptionToQuestion = (questionId: number) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId && q.options && q.type === QUESTION_TYPES.SINGLE_CHOICE) {
          return { ...q, options: [...q.options, `New Option`] };
        }
        return q;
      })
    );
  };

  const removeQuestion = (id: number) => {
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); 

    if (!pollId) {
      setMessage("❌ Error: Poll ID is missing. Cannot submit survey.");
      return;
    }

    // Validation
    if (!name || !respondentGender || !respondentAge) {
      setMessage("❌ Please fill in all required respondent details (Name, Gender, Age).");
      return;
    }

    const unansweredRequiredQuestions = questions.some(q =>
      (q.type === QUESTION_TYPES.SINGLE_CHOICE || q.type === QUESTION_TYPES.YES_NO_NOT_SURE) && !q.answer
    );

    if (unansweredRequiredQuestions) {
      setMessage("❌ Please answer all required survey questions.");
      return;
    }

    const surveyData = {
      pollId: parseInt(pollId), 
      respondent: { name, gender: respondentGender, age: parseInt(respondentAge) },
      answers: questions.map(q => ({
        id: q.id,
        text: q.text,
        type: q.type,
        answer: q.answer,
        options: q.options || undefined
      })),
    };

    try {
      const response = await fetch(`${baseURL}/api/opinion_poll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        setMessage("✅ Survey submitted successfully!");
        setName('');
        setRespondentGender('');
        setRespondentAge('');
        setQuestions(prevQuestions => prevQuestions.map(q => ({ ...q, answer: "" })));
      
      } else {
        const errorData = await response.json();
        setMessage(`❌ Failed to submit survey: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setMessage("❌ Network or server error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-blue-600 text-xl font-semibold">Loading poll details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-red-700 text-xl font-semibold p-4 rounded-lg bg-white shadow-md">
          {error}
        </div>
      </div>
    );
  }

  if (!pollDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600 text-xl font-semibold">Poll not found or not loaded.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl my-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Opinion Poll Survey</h2>
      <p className="text-lg text-gray-600 mb-6 text-center">For Poll: <span className="font-semibold text-blue-700">{pollDetails.title}</span></p>

      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Respondent Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Enter Name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
            required
          />
        </div>
        <div>
          <label htmlFor="respondent-gender" className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="respondent-gender"
            value={respondentGender}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRespondentGender(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label htmlFor="respondent-age" className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <select
            id="respondent-age"
            value={respondentAge}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRespondentAge(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
            required
          >
            <option value="" disabled>Select Age</option>
            {ageOptions.map((age: number) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dynamic Questions Section */}
      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Survey Questions</h3>
      <div className="space-y-6">
        {questions.map((question: SurveyQuestion, qIndex: number) => (
          <div key={question.id} className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white">
            <div className="flex justify-between items-center mb-4">
              <label htmlFor={`question-${question.id}`} className="block text-md font-medium text-gray-800 mb-2">
                {`Question ${qIndex + 1}:`}
              </label>
              {/* Only allow removing dynamically added questions, not initial ones */}
              {qIndex >= 3 && ( // Assuming initial 3 questions are fixed
                <button
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-medium"
                >
                  Remove Question
                </button>
              )}
            </div>

            {/* Question Text Input (for dynamic editing) */}
            {/* For initial questions, you might want to make this readOnly or hide it if they are fixed */}
            <input
              type="text"
              value={question.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestionText(question.id, e.target.value)}
              placeholder="Enter your question here"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white mb-4"
              // Make initial questions' text read-only if they are fixed
              readOnly={qIndex < 3}
            />

            {question.type === QUESTION_TYPES.SINGLE_CHOICE && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Select one option:</p>
                {question.options?.map((option: string, oIndex: number) => (
                  <div key={oIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`question-${question.id}-option-${oIndex}`}
                      name={`question-${question.id}`}
                      value={option}
                      checked={question.answer === option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionAnswerChange(question.id, e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`question-${question.id}-option-${oIndex}`} className="ml-3 text-sm text-gray-700">
                      {/* For the first question's options, they should not be editable */}
                      {qIndex === 0 ? (
                        <span>{option}</span>
                      ) : (
                        <input
                          type="text"
                          value={option}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestionOption(question.id, oIndex, e.target.value)}
                          className="p-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                        />
                      )}
                    </label>
                  </div>
                ))}
                {/* Only allow adding options to dynamically added single choice questions */}
                {qIndex >= 3 && (
                  <button
                    type="button"
                    onClick={() => addOptionToQuestion(question.id)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Option
                  </button>
                )}
              </div>
            )}

            {question.type === QUESTION_TYPES.OPEN_ENDED && (
              <div>
                <textarea
                  id={`question-${question.id}`}
                  value={question.answer}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleQuestionAnswerChange(question.id, e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                  placeholder="Type your answer here..."
                ></textarea>
              </div>
            )}

            {question.type === QUESTION_TYPES.YES_NO_NOT_SURE && (
              <div className="space-y-3">
                {question.options?.map((option: string, oIndex: number) => (
                  <div key={oIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`question-${question.id}-option-${oIndex}`}
                      name={`question-${question.id}`}
                      value={option}
                      checked={question.answer === option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionAnswerChange(question.id, e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`question-${question.id}-option-${oIndex}`} className="ml-3 text-sm text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => addQuestion(QUESTION_TYPES.SINGLE_CHOICE)}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
        >
          Add Single Choice Question
        </button>
        <button
          type="button"
          onClick={() => addQuestion(QUESTION_TYPES.OPEN_ENDED)}
          className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-200"
        >
          Add Open-Ended Question
        </button>
        <button
          type="button"
          onClick={() => addQuestion(QUESTION_TYPES.YES_NO_NOT_SURE)}
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-200"
        >
          Add Yes/No/Not Sure Question
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit Survey
        </button>
      </div>

      {message && (
        <p className={`text-center mt-6 text-base font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default SurveyForm;