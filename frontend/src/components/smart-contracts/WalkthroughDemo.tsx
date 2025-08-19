// components/smart-contracts/WalkthroughDemo.tsx
"use client";

import React from "react";

export default function WalkthroughDemo() {
  const src = "/videos/supplychain-walkthrough.mp4";
  const poster = "/videos/thumbnail.jpg";

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
          <div className="relative pt-[56.25%]">
            <video
              className="absolute inset-0 h-full w-full"
              src={src}
              poster={poster}
              controls
              playsInline
              preload="metadata"
            >
              Your browser doesn’t support embedded videos.
            </video>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <a
            href={src}
            download
            className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
          >
            Download video
          </a>
          <span className="text-gray-400">MP4/H.264 recommended</span>
        </div>
      </div>
    </div>
  );
}
