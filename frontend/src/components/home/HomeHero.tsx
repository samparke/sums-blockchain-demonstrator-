// components/Example.tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

const HomeHero: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden"></div>

      <div
        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  
                      lg:mx-0 lg:max-w-none 
                      lg:grid-cols-[1fr_2fr]   /* give 2nd column twice the width */
                      lg:items-start lg:gap-y-10"
      >
        <div
          className="lg:col-span-2 lg:col-start-1 lg:row-start-1 
                        lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 
                        lg:gap-x-8 lg:px-8"
        >
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Blockchain Technology Demonstrator
              </h1>
            </div>
          </div>
        </div>

        <div
          className="-mt-12 p-12 
                        lg:sticky lg:top-4 
                        lg:col-start-2 lg:row-span-2 lg:row-start-1 
                        lg:overflow-hidden 
                        flex justify-end"
        >
          {" "}
          <div className="w-full max-w-[1000px]">
            {" "}
            <DotLottieReact
              src="https://lottie.host/3ac7fab5-7012-4e49-8609-0f6b1e610961/fOoTQRCw7O.lottie"
              loop
              autoplay
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>

        <div
          className="lg:col-span-2 lg:col-start-1 lg:row-start-2 
                        lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 
                        lg:gap-x-8 lg:px-8"
        >
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-2 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <span>
                    <p>Designed and Developed by:</p>
                    <strong className="font-semibold text-gray-900 text-lg">
                      Samuel Parke, BA Business Management, 2025
                    </strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <p>Academic Advisors:</p>
                    <strong className="font-semibold text-gray-900 text-lg">
                      Dr Terrence Perera &amp; Dr Amin Vafadarnikjoo
                    </strong>
                  </span>
                </li>
                <li className="flex gap-x-3 mt-10">
                  <span>
                    <p className="text-sm">
                      Funded by Sheffield University Internship Programme, 2025
                    </p>
                  </span>
                </li>
              </ul>

              <div className="mt-20">
                <Image
                  src="/images/sheffieldmanagementlogo.png"
                  alt="Sheffield Management School logo"
                  width={170}
                  height={70}
                  sizes="170px"
                  className="h-[70px] w-auto select-none"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
