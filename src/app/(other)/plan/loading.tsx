import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center pb-10 md:pb-0 animate-pulse">
      <div className="w-full px-5 sm:px-10 xl:px-0">
        <div className="w-full pt-6 md:pt-12">
          <div className="flex flex-wrap justify-center gap-5 ">
            <div className="border-2 rounded-3xl p-10 min-w-80 max-w-96 border-gray-300">
              <div className="flex items-center justify-between gap-4">
                <div className="h-6 bg-green rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-green rounded w-24"></div>
              </div>
              <div className="h-20 bg-green rounded w-full mt-4"></div>
              <div className="flex items-baseline gap-1 mt-6">
                <div className="h-16 bg-green rounded w-1/2"></div>
                <div className="h-4 bg-green rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-green rounded w-full mt-6"></div>
              <ul className="mt-8 space-y-3">
                <li className="flex gap-2">
                  <div className="h-6 w-5 bg-green rounded"></div>
                  <div className="h-4 bg-green rounded w-full"></div>
                </li>
                <li className="flex gap-2">
                  <div className="h-6 w-5 bg-green rounded"></div>
                  <div className="h-4 bg-green rounded w-full"></div>
                </li>
              </ul>
            </div>
            <div className="border-2 rounded-3xl p-10 min-w-80 max-w-96 border-gray-300">
              <div className="flex items-center justify-between gap-4">
                <div className="h-6 bg-green rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-green rounded w-24"></div>
              </div>
              <div className="h-20 bg-green rounded w-full mt-4"></div>
              <div className="flex items-baseline gap-1 mt-6">
                <div className="h-16 bg-green rounded w-1/2"></div>
                <div className="h-4 bg-green rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-green rounded w-full mt-6"></div>
              <ul className="mt-8 space-y-3">
                <li className="flex gap-2">
                  <div className="h-6 w-5 bg-green rounded"></div>
                  <div className="h-4 bg-green rounded w-full"></div>
                </li>
                <li className="flex gap-2">
                  <div className="h-6 w-5 bg-green rounded"></div>
                  <div className="h-4 bg-green rounded w-full"></div>
                </li>
              </ul>
            </div>
            <div className="border-2 rounded-3xl p-10 min-w-80 max-w-96 border-gray-300">
              <div className="flex items-center justify-between gap-4">
                <div className="h-6 bg-green rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-green rounded w-24"></div>
              </div>
              <div className="h-20 bg-green rounded w-full mt-4"></div>
              <div className="flex items-baseline gap-1 mt-6">
                <div className="h-16 bg-green rounded w-1/2"></div>
                <div className="h-4 bg-green rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-green rounded w-full mt-6"></div>
              <ul className="mt-8 space-y-3">
                <li className="flex gap-2">
                  <div className="h-6 w-5 bg-green rounded"></div>
                  <div className="h-4 bg-green rounded w-full"></div>
                </li>
                <li className="flex gap-2">
                  <div className="h-6 w-5 bg-green rounded"></div>
                  <div className="h-4 bg-green rounded w-full"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
