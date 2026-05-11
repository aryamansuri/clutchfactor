import { useState } from "react";

export default function WhatIfSimulator() {

  const [scoreDiff, setScoreDiff] = useState(5);

    const probability = Math.min(
    99,
    Math.max(
        1,
        Math.round(
        50 +
        scoreDiff * 4 +
        Math.sin(scoreDiff) * 6
        )
    )
    );

  return (
    <div className="panel rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        What If Simulator
      </h2>

      <div className="space-y-6">

        <div>
          <div className="mb-2 text-gray-400">
            Score Differential
          </div>

          <input
            type="range"
            min="-10"
            max="10"
            value={scoreDiff}
            onChange={(e) =>
              setScoreDiff(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div className="text-5xl font-black text-yellow-400">
          {probability}%
        </div>

        <div className="text-gray-400">
          Adjusted win probability
        </div>
      </div>
    </div>
  );
}