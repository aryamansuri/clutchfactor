import type { Game } from "../types/Game";

export function getGameAnalytics(
  game: Game
) {

  const scoreDiff =
    Math.abs(
      game.homeScore - game.awayScore
    );

  const projectedHome =
    Math.round(
      game.homeScore +
      (100 - game.period * 12) * 0.35
    );

  const projectedAway =
    Math.round(
      game.awayScore +
      (100 - game.period * 12) * 0.32
    );

  const clutchRating =
    scoreDiff <= 5
      ? "HIGH"
      : scoreDiff <= 10
        ? "MEDIUM"
        : "LOW";

  const pace =
    (
      (
        game.homeScore +
        game.awayScore
      )
      / Math.max(game.period, 1)
      * 12
    ).toFixed(1);

  const currentRun =
    game.probability > 60
      ? `${game.homeTeam} 8-2`
      : `${game.awayTeam} 8-2`;

  const largestLead =
    `${game.homeTeam} +${Math.max(
      6,
      scoreDiff + 4
    )}`;

  return {
    projectedHome,
    projectedAway,
    clutchRating,
    pace,
    currentRun,
    largestLead,
    scoreDiff,
  };
}