import React from "react";

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded w-48 shimmer"></div>
        <div className="h-10 bg-gray-200 rounded w-32 shimmer"></div>
      </div>
      
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 shimmer mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-12 shimmer"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg shimmer"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Search and filters skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 h-10 bg-gray-200 rounded shimmer"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-24 shimmer"></div>
          <div className="h-10 bg-gray-200 rounded w-24 shimmer"></div>
        </div>
      </div>
      
      {/* Category chips skeleton */}
      <div className="flex gap-2 mb-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-8 bg-gray-200 rounded-full w-20 shimmer"></div>
        ))}
      </div>
      
      {/* Task list skeleton */}
      <div className="space-y-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer mt-1"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 shimmer mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full shimmer mb-3"></div>
                <div className="flex items-center gap-4">
                  <div className="h-6 bg-gray-200 rounded-full w-16 shimmer"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 shimmer"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded shimmer"></div>
                <div className="w-8 h-8 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;