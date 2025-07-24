import React from 'react';
import { CheckCircle, Home, BarChart2 } from 'lucide-react'; 

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8 sm:p-10 text-center border border-gray-200">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-scale-in" />

        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Thank You! Your Vote Counts.
        </h1>

        <p className="text-4xl text-gray-600 mb-8">
          We've successfully recorded your responses. Your participation helps us gather valuable insights.
        </p>

         <p className="mt-8 text-sm text-gray-500">
          Powered by Your Opinion
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;