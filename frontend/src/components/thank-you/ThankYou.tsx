import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const ThankYouPage: React.FC = () => (
  <section className="flex flex-col justify-center items-center bg-white px-6 h-screen">
    <CheckCircleIcon className="h-24 w-24 text-green-500 mb-6" />

    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
      Thank You!
    </h1>
  </section>
);

export default ThankYouPage;
