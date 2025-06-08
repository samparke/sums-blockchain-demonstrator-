"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function NavBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkClasses = (href: string) =>
    `block py-2 px-3 rounded-sm md:p-0 ${
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
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <Image
            src="/SUMS-logo.png"
            alt="Sheffield University Management School Logo"
            width={150}
            height={150}
          />
        </a>

        <div className="flex md:order-2 space-x-3">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:mt-0">
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
