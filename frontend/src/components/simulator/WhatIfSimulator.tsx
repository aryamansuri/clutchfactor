import { useState } from "react";

import type { Game } from "../../types/Game";

interface Props {
  game: Game;
}

export default function WhatIfSimulator({game}: Props) {

  const [swing, setSwing] =
    useState(3);

  const adjustedProbability =
    Math.min(
      99,
      Math.max(
        1,
        game.probability + swing * 3
      )
    );

  const probabilityDelta =
    adjustedProbability -
    game.probability;

  const pressureLevel =
    Math.abs(probabilityDelta) >= 10
      ? "HIGH"
      : Math.abs(probabilityDelta) >= 5
        ? "MEDIUM"
        : "LOW";

  return (
      <div className="panel rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold">
              Predictive Simulator
            </h2>

            <div className="text-sm text-gray-400 mt-1">
              Live win probability modeling
            </div>
          </div>

          <div className="text-sm text-yellow-400 font-bold">
            LIVE MODEL
          </div>
        </div>

        <div className="text-sm text-gray-400 leading-relaxed">
          Simulate how momentum swings and scoring runs
          impact live win probability.
        </div>

        <div className="space-y-8">

          <div>

            <div className="text-gray-400 mb-4">
              Quick Simulations
            </div>

            <div className="grid grid-cols-2 gap-3">

              <button
                  onClick={() => setSwing(3)}
                  className="panel rounded-2xl p-4 hover:border-green-400/40 transition-all"
              >
                <div className="text-lg font-bold">
                  +3PT Shot
                </div>

                <div className="text-sm text-gray-400 mt-1">
                  Immediate scoring swing
                </div>
              </button>

              <button
                  onClick={() => setSwing(6)}
                  className="panel rounded-2xl p-4 hover:border-yellow-400/40 transition-all"
              >
                <div className="text-lg font-bold">
                  8-0 Run
                </div>

                <div className="text-sm text-gray-400 mt-1">
                  Momentum surge
                </div>
              </button>

              <button
                  onClick={() => setSwing(-3)}
                  className="panel rounded-2xl p-4 hover:border-red-400/40 transition-all"
              >
                <div className="text-lg font-bold">
                  Turnover
                </div>

                <div className="text-sm text-gray-400 mt-1">
                  Lost possession
                </div>
              </button>

              <button
                  onClick={() => setSwing(-5)}
                  className="panel rounded-2xl p-4 hover:border-red-500/40 transition-all"
              >
                <div className="text-lg font-bold">
                  Cold Stretch
                </div>

                <div className="text-sm text-gray-400 mt-1">
                  Offensive drought
                </div>
              </button>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="panel rounded-2xl p-4">

              <div className="text-xs text-gray-400">
                CURRENT WP
              </div>

              <div className="text-4xl font-black mt-2">
                {game.probability}%
              </div>
            </div>

            <div className="panel rounded-2xl p-4">

              <div className="text-xs text-gray-400">
                {game.homeTeam} PROJECTED WP
              </div>

              <div className="text-4xl font-black mt-2 text-yellow-400">
                {adjustedProbability}%
              </div>
            </div>
          </div>

          <div className="panel rounded-2xl p-5">

            <div className="flex justify-between items-center">

              <div>

                <div className="text-xs text-gray-400">
                  MODEL IMPACT
                </div>

                <div
                    className={`text-3xl font-black mt-2 ${
                        probabilityDelta >= 0
                            ? "text-green-400"
                            : "text-red-400"
                    }`}
                >
                  {probabilityDelta >= 0 ? "+" : ""}
                  {probabilityDelta}%
                </div>
              </div>

              <div className="text-right">

                <div className="text-xs text-gray-400">
                  GAME PRESSURE
                </div>

                <div className="text-xl font-bold mt-2 text-yellow-400">
                  {pressureLevel}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}