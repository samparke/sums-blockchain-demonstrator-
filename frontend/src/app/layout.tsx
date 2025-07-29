import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import NavBar from "@/components/header/Navbar";
import Presentation from "./presentation/presentation";

export const metadata: Metadata = {
  title: "SUMS Blockchain Demonstrator",
  description: "Blockchain Demonstrator",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden overscroll-none">
        <Providers>
          <NavBar />
          {props.children}
          {/* <Presentation /> */}
        </Providers>
      </body>
    </html>
  );
}
