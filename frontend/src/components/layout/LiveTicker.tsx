import type { Game } from "../../types/Game";

type Props = {
  games: Game[];
};

export default function LiveTicker({
  games,
}: Props) {

  return (
    <div className="w-full overflow-hidden border-b border-white/5 bg-black/20">

      <div className="flex whitespace-nowrap animate-[ticker_20s_linear_infinite] py-3">

        {[...games, ...games].map((game, index) => (

          <div
            key={index}
            className="mx-8 flex items-center gap-3 text-sm"
          >

            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

            <span className="text-gray-300 font-medium">

              {game.homeTeam}

              {" "}

              {game.homeScore}

              {" - "}

              {game.awayScore}

              {" "}

              {game.awayTeam}

            </span>
          </div>
        ))}
      </div>
    </div>
  );
}