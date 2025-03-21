import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h2 className="text-2xl font-semibold text-red-600">Something went wrong.</h2>
      <p className="text-gray-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
