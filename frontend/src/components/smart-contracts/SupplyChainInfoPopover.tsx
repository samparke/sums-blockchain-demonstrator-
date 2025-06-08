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
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 w-[500px] bg-gray-800 border border-gray-900 rounded-lg shadow-lg">
            <div className="p-3">
              <h4 className="font-semibold text-white text-lg">
                Supply Chain Transparency Using Blockchain
              </h4>{" "}
              <br />
              <div className="mt-1 text-sm font-light text-white">
                <div>
                  <p>
                    In today’s global markets, supply chains often involve
                    multiple companies, countries, and systems. These fragmented
                    systems makes it difficult to track where things are and
                    which party is involved in each stage. This simulation shows
                    how blockchain can offer a clearer, more reliable way to
                    manage that process.
                  </p>{" "}
                  <br />
                  <p>
                    It follows a shipment through three key stages: creation,
                    dispatch, and delivery. Each of these actions is recorded on
                    a public blockchain. As we've covered in the hash
                    demonstration, data cannot be changed or hidden without
                    drastic changes to the hash - which links to other blocks
                    etc. Anyone involved, from sender to receiver, can see what
                    happened and when.
                  </p>{" "}
                  <br />
                  <p>
                    Companies like Peroni (QR code on beer bottles) have used
                    this technology to show exactly where their products come
                    from, providing undeniable proof of its sourcing from
                    italian farms.
                  </p>{" "}
                  <br />
                  <p>
                    While this example runs manually, similar systems in the
                    real world could link to devices like temperature or
                    location sensors. These would update the blockchain
                    automatically, giving businesses live insights without
                    manual input.
                  </p>{" "}
                  <br />
                  <p>
                    In summary, when everyone can see the same trusted version
                    of events, it’s easier to reduce errors, avoid fraud, and
                    respond quickly when things go wrong. For businesses, that
                    means better performance and stronger relationships with
                    partners and customers alike.
                  </p>{" "}
                  <br />
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
