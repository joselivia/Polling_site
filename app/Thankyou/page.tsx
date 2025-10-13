import React from "react";
import { CheckCircle, Facebook } from "lucide-react";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8 sm:p-10 text-center border border-gray-200">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-scale-in" />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Thank You! Your Vote Counts.
        </h1>
        <p className="text-4xl text-gray-600 mb-8">
          We've successfully recorded your responses. Your participation helps
          us gather valuable insights.
        </p>
        <p className="mt-8 text-sm text-gray-500">Powered by Your Opinio"n</p>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 leading-tight">Follow Us On</h1>
        <div className=" flex justify-center space-x-4">
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-800 rounded-full shadow hover:bg-indigo-700 transition"
          >
            <Facebook className="w-5 h-5 mr-2" />
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3  text-gray-800 rounded-full shadow hover:bg-gray-600 transition"
          >
            <FaXTwitter className="w-5 h-5 mr-2" />
          </a>{" "}
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-800 rounded-full shadow hover:bg-red-300 transition"
          >
            <FaTiktok className="w-5 h-5 mr-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
