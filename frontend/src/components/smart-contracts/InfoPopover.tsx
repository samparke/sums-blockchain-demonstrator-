"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface InfoPopoverProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoPopover({ title, children }: InfoPopoverProps) {
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
        aria-label={`What is ${title}?`}
      >
        <Info className="w-4 h-4" />
      </button>

      {open && (
        <>
          <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-3">
              <h4 className="font-semibold text-gray-900">{title}</h4>
              <div className="mt-1 text-sm text-gray-600">
                {children}
              </div>
            </div>
          </div>
          <div
            className="absolute w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200 -top-1 right-4"
          />
        </>
      )}
    </div>
  );
}