import { Link } from "react-router-dom";
import { teamLogos } from "../../assets/teams";

type Props = {
  game: {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    quarter: string;
    time: string;
    probability: number;
  };
};

export default function GameCard({ game }: Props) {
  return (
    <Link to={`/game/${game.id}`}>
      <div className="panel rounded-3xl p-6 hover:border-yellow-400/40
                hover:scale-[1.02]
                hover:-translate-y-1
                transition-all
                duration-300
                glow-yellow">

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE • {game.quarter} {game.time}
          </div>

          <div className="text-yellow-400 font-bold">
            {game.probability}%
            {game.probability > 75 && (
              <div className="mt-4 text-sm text-red-400 font-bold tracking-widest animate-pulse">
                🔥 CLUTCH TIME
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">

          <div className="space-y-4">

            <div className="flex items-center gap-4">
              <img
                src={teamLogos[game.awayTeam]}
                alt={game.awayTeam}
                className="w-14 h-14 object-contain"
              />

              <div>
                <div className="text-2xl font-bold">
                  {game.awayScore}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={teamLogos[game.homeTeam]}
                alt={game.homeTeam}
                className="w-14 h-14 object-contain"
              />

              <div>
                <div className="text-2xl font-bold">
                  {game.homeScore}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${game.probability}%` }}
          />
        </div>
      </div>
    </Link>
  );
}