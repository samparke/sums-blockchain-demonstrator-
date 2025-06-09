"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(!(y > lastScrollY && y > 50));
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkClasses = (href: string) =>
    `block py-2 px-3 rounded-sm md:px-4 ${
      pathname === href
        ? "text-blue-700 bg-blue-100 md:bg-transparent md:text-blue-700"
        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
    }`;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full bg-white shadow
        transform transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}
        z-20
      `}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex-shrink-0">
          <Image src="/SUMS-logo.png" alt="SUMS Logo" width={120} height={40} />
        </a>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          type="button"
          aria-controls="navbar-sticky"
          aria-expanded={menuOpen}
          className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          id="navbar-sticky"
          className={`
            ${menuOpen ? "block" : "hidden"} 
            w-full mt-4 md:mt-0
            md:flex md:justify-center md:flex-1
            transition-all
          `}
        >
          <ul className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-6">
            <li>
              <a href="/" className={linkClasses("/")}>
                Blockchain
              </a>
            </li>
            <li>
              <a
                href="/smart-contracts"
                className={linkClasses("/smart-contracts")}
              >
                Smart Contracts
              </a>
            </li>
            <li>
              <a href="/quiz" className={linkClasses("/quiz")}>
                Quiz
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
