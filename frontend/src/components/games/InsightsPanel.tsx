import { useMemo, useState } from "react";
import type { Game } from "../../types/Game";
import type { ProbabilitySnapshot } from "../../types/ProbabilitySnapshot";

type Props = {
  game: Game;
  momentumData: ProbabilitySnapshot[];
};

export default function InsightsPanel({
  game,
  momentumData,
}: Props) {

  const [activeTab, setActiveTab] =
    useState<"story" | "comparison" | "forecast">(
      "story"
    );

  const insights = useMemo(() => {

    const probabilities =
      momentumData.map(
        (snapshot) => snapshot.probability
      );

    const peak =
      probabilities.length > 0
        ? Math.max(...probabilities)
        : game.probability;

    const low =
      probabilities.length > 0
        ? Math.min(...probabilities)
        : game.probability;

    const volatility =
      peak - low;

    return {
      peak,
      low,
      volatility,
    };

  }, [momentumData, game]);

  return (
    <div className="panel rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Insights
      </h2>

      <div className="flex gap-3 mb-6">

        {["story", "comparison", "forecast"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab as
                    | "story"
                    | "comparison"
                    | "forecast"
                )
              }
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-900 text-gray-400"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          )
        )}
      </div>

      {activeTab === "story" && (
        <div className="space-y-4 text-sm">

          <InsightRow
            label="Peak Win Probability"
            value={`${insights.peak}%`}
          />

          <InsightRow
            label="Lowest Win Probability"
            value={`${insights.low}%`}
          />

          <InsightRow
            label="Momentum Swing"
            value={`${insights.volatility}%`}
          />

          <InsightRow
            label="Current Leader"
            value={
              game.homeScore > game.awayScore
                ? game.homeTeam
                : game.awayTeam
            }
          />
        </div>
      )}

      {activeTab === "comparison" && (
        <div className="space-y-4 text-sm">

          <InsightRow
            label="Offensive Efficiency"
            value={`${105 + game.period * 2}`}
          />

          <InsightRow
            label="Clutch Score"
            value={`${70 + game.probability / 2}`}
          />

          <InsightRow
            label="Possession Pressure"
            value={
              game.probability > 70
                ? "HIGH"
                : "MEDIUM"
            }
          />

          <InsightRow
            label="Game Pace"
            value={`${95 + game.period * 2}`}
          />
        </div>
      )}

      {activeTab === "forecast" && (
        <div className="space-y-4 text-sm">

          <InsightRow
            label="Projected Winner"
            value={
              game.probability >= 50
                ? game.homeTeam
                : game.awayTeam
            }
          />

          <InsightRow
            label="Upset Probability"
            value={`${100 - game.probability}%`}
          />

          <InsightRow
            label="Expected Finish"
            value={
              game.probability > 75
                ? "Comfortable"
                : "Close Finish"
            }
          />

          <InsightRow
            label="Overtime Chance"
            value={
              Math.abs(
                game.homeScore - game.awayScore
              ) <= 3
                ? "HIGH"
                : "LOW"
            }
          />
        </div>
      )}
    </div>
  );
}

function InsightRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-3">
      <span className="text-gray-400">
        {label}
      </span>

      <span className="font-bold text-white">
        {value}
      </span>
    </div>
  );
}