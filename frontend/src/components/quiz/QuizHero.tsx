// components/QuizHero.tsx
import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

const QuizHero: React.FC = () => (
  <section className="flex flex-col justify-center items-center bg-white px-6 py-16 sm:py-20 min-h-screen">
    <QuestionMarkCircleIcon className="h-24 w-24 text-indigo-500 mb-6" />

    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
      Test Your Knowledge
    </h1>

    <p className="text-lg text-gray-700 mb-8 max-w-2xl text-center">
      Ready to see what you've learned? Dive into the quiz and challenge
      yourself on the core concepts of blockchain technology. Good luck!
    </p>

    <button
      type="button"
      className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Start Quiz
    </button>
  </section>
);

export default QuizHero;
