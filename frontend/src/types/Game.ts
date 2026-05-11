export type Game = {
  id: number;

  homeTeam: string;
  awayTeam: string;

  homeScore: number;
  awayScore: number;

  quarter: string;
  time: string;

  probability: number;
};