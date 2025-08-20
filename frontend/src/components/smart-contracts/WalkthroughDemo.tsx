// components/smart-contracts/WalkthroughDemo.tsx
"use client";

import React from "react";
import DemoVideo from "./DemoVideo";

export default function WalkthroughDemo() {
  const src = "/videos/walkthrough-demonstrator.mp4";
  const poster = "/videos/thumbnail.png";

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mt-20">
      <div className="px-8 py-6 bg-gray-50">
        <h3 className="text-xl font-medium text-gray-900">Walkthrough Demo</h3>
        <p className="mt-1 text-gray-600 font-light">
          Create, start, and complete a shipment.
        </p>
      </div>

      <div className="p-4 md:p-6">
        <div className="relative w-full overflow-hidden rounded-lg bg-black">
          <DemoVideo />
        </div>
      </div>
    </div>
  );
}
