import React from "react";

export default function LoadingData() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="h-4 bg-gray 100 mb-1" key={i} />
      ))}
    </div>
  );
}
