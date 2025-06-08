// components/Example.tsx
import React from "react";
import {
  CubeIcon,
  CodeBracketSquareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Hash, Link } from "lucide-react";

const HomeHero: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="50%"
              y={-1}
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern)"
            strokeWidth={0}
          />
        </svg>
      </div>

      {/* Main content grid */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        {/* Hero text */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-600">
                Sheffield Management School
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Blockchain Education
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
                An introduction to blockchain technology to Management School
                students.
              </p>
            </div>
          </div>
        </div>

        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <DotLottieReact
            src="https://lottie.host/3ac7fab5-7012-4e49-8609-0f6b1e610961/fOoTQRCw7O.lottie"
            loop
            autoplay
            style={{ height: 400, width: 800 }}
          />
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p>This platform will include:</p>

              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <Hash
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Hash function
                    </strong>{" "}
                    See how input data is transformed into a fixed-size hash.
                    This ensures data integrity—any change to the input produces
                    a completely different output.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CubeIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Block Structure
                    </strong>{" "}
                    Explore how transactions, timestamp, and previous hash are
                    packaged into a block. Each block links to the prior one,
                    forming an immutable chain.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <Link
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Chain Linking
                    </strong>{" "}
                    Visualize how blocks connect through hashes. This chaining
                    mechanism prevents tampering—altering one block invalidates
                    all subsequent blocks.
                  </span>
                </li>
              </ul>

              <p className="mt-6">The second page includes:</p>

              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CodeBracketSquareIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Smart Contracts
                    </strong>{" "}
                    See how input data is transformed into a fixed-size hash.
                    This ensures data integrity—any change to the input produces
                    a completely different output.
                  </span>
                </li>
              </ul>

              <p className="mt-6">Finally, the third page includes:</p>

              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <QuestionMarkCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Quiz
                    </strong>{" "}
                    See how input data is transformed into a fixed-size hash.
                    This ensures data integrity—any change to the input produces
                    a completely different output.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
