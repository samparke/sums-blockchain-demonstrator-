import Quiz from "@/components/quiz/Quiz";

export default function LearningPage() {
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 pt-10">

    <div className="relative isolate overflow-hidden bg-white px-6 py-10 sm:py-10 lg:overflow-visible lg:px-0">
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
      <Quiz />
    </div>
  );
}
