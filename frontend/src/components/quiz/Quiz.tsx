"use client";

import React, { useState, useEffect } from "react";
import { Question, quizQuestions } from "@/hooks/quizQuestions";
import { motion } from "framer-motion";

function shuffleArray<T>(array: T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const qShuffle = shuffleArray(quizQuestions).map((q) => {
      const opts = shuffleArray(q.options);
      const correctIndex = opts.findIndex(
        (o) => o === q.options[q.correctIndex]
      );
      return { ...q, options: opts, correctIndex };
    });
    setShuffledQuestions(qShuffle);
  }, []);

  if (!shuffledQuestions.length) return null;
  const q = shuffledQuestions[current];
  const progress =
    ((current + (showFeedback ? 1 : 0)) / shuffledQuestions.length) * 100;

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === q.correctIndex) setScore((s) => s + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < shuffledQuestions.length) {
      setCurrent(next);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetake = () => {
    setScore(0);
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setFinished(false);
    const qShuffle = shuffleArray(quizQuestions).map((q) => {
      const opts = shuffleArray(q.options);
      const correctIndex = opts.findIndex(
        (o) => o === q.options[q.correctIndex]
      );
      return { ...q, options: opts, correctIndex };
    });
    setShuffledQuestions(qShuffle);
  };

  return (
    <div className="flex items-center justify-center w-full h-[calc(80vh-64px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {finished ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4 text-black">
              Quiz Complete!
            </h2>
            <p className="text-gray-700 mb-6">
              You scored{" "}
              <span className="font-bold text-indigo-600">{score}</span> out of{" "}
              <span className="font-bold text-indigo-600">
                {shuffledQuestions.length}
              </span>
            </p>
            <button
              onClick={handleRetake}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
            >
              Retake Quiz
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              Question {current + 1} of {shuffledQuestions.length}
            </h3>
            <p className="text-gray-600 mb-6">{q.question}</p>

            <div className="space-y-4">
              {q.options.map((opt, idx) => {
                let classes =
                  "block w-full text-left p-4 border-2 rounded-xl transition";
                if (!showFeedback) {
                  classes +=
                    selected === idx
                      ? " border-indigo-500 bg-indigo-50"
                      : " border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
                } else {
                  if (idx === q.correctIndex)
                    classes += " border-green-500 bg-green-50";
                  else if (selected === idx)
                    classes += " border-red-500 bg-red-50";
                  else classes += " border-gray-200";
                }
                return (
                  <label key={idx} className={classes}>
                    <input
                      type="radio"
                      name="option"
                      disabled={showFeedback}
                      checked={selected === idx}
                      onChange={() => setSelected(idx)}
                      className="mr-3"
                    />
                    <span className="text-gray-800">{opt}</span>
                  </label>
                );
              })}
            </div>

            {!showFeedback ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className={`mt-6 w-full py-3 rounded-full text-white font-semibold transition ${
                  selected === null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-700"
                }`}
              >
                {current + 1 === shuffledQuestions.length
                  ? "Submit"
                  : "Check Answer"}
              </button>
            ) : (
              <div className="mt-6">
                <p className="text-sm italic text-gray-700 mb-4">
                  {q.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-semibold"
                >
                  {current + 1 === shuffledQuestions.length
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
