"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

export default function SupplyChainInfoPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label={"Full Supply Chain Popup"}
      >
        <Info className="w-5 h-5" />
      </button>

      {open && (
        <>
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 w-[500px] bg-gray-700 border border-gray-900 rounded-lg shadow-lg">
            <div className="p-3">
              <h4 className="font-semibold text-white text-lg">
                Supply Chain Transparency Using Blockchain
              </h4>{" "}
              <br />
              <div className="mt-1 text-md font-light text-white">
                <div>
                  <p>
                    Supply chains often involve multiple parties - each using
                    fragmented, often siloed systems. This makes it difficult to
                    track where goods are and what actions each party has taken.
                    This simulation shows how blockchain can offer a clearer,
                    more reliable way to manage that process.
                  </p>{" "}
                  <br />
                  <p>
                    It follows a shipment through three key stages: creation,
                    dispatch, and delivery. Each of these actions is recorded on
                    a public blockchain. Anyone can see what happened and when.
                  </p>{" "}
                  <br />
                  <p>
                    While this example runs manually, similar systems in the
                    real world could link to devices like IOT sensors to update
                    the blockchain automatically - removing the liklihood of
                    data entry errors and further improving trust across the
                    supply chain.
                  </p>{" "}
                  <br />
                  <a
                    href="https://sloanreview.mit.edu/sponsors-content/brewing-up-a-blockchain-solution-for-supply-chain-transparency/"
                    className="text-blue-400 hover:text-blue-300 underline transition duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See How Peroni Used Blockchain to Provide Transparency.
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200 -top-1 right-4" />
        </>
      )}
    </div>
  );
}
