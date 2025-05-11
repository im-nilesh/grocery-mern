import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Loading;
