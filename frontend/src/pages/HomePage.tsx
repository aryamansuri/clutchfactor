import Navbar from "../components/layout/Navbar";
import GameCard from "../components/games/GameCard";
import { useEffect, useState } from "react";
import { fetchRealGames } from "../api/games";
import LiveTicker from "../components/layout/LiveTicker";
import type { Game } from "../types/Game";
import { stompClient } from "../websocket/gameSocket";

export default function HomePage() {

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadGames() {
      console.log("starting fetch");

      try {
        const data = await fetchRealGames();
        console.log("fetched data:", data);
        setGames(data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("setting loading false");
        setLoading(false);
      }
    }

    loadGames();

    stompClient.onConnect = () => {

      stompClient.subscribe(
        "/topic/games",
        (message) => {

          const updatedGames =
            JSON.parse(message.body);

          setGames(updatedGames);
        }
      );
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };

  }, []);

  console.log("loading:", loading);
  if (loading) {
    return (
      <div className="min-h-screen px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="panel rounded-3xl p-6 animate-pulse"
              >
                <div className="h-6 w-24 bg-white/10 rounded mb-6" />

                <div className="h-20 bg-white/5 rounded-xl mb-4" />

                <div className="h-3 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const demoGame: Game = {
    id: 999999,
    homeTeam: "LAL",
    awayTeam: "BOS",
    homeScore: 108,
    awayScore: 104,
    probability: 72,
    quarter: "Q4",
    time: "2:14",
    period: 4,
    status: "Live",
  };

  const displayedGames =
    games.length > 0
      ? games
      : [demoGame];

  return (
      <div className="min-h-screen">

        {games.length === 0 && (
            <div className="panel rounded-3xl p-6 mb-8 text-center">

              <div className="text-yellow-400 font-bold mb-2">
                DEMO MODE
              </div>

              <div className="text-2xl font-bold mb-2">
                No Live NBA Games Right Now
              </div>

              <div className="text-gray-400">
                Showing a simulated game so you can explore
                ClutchFactor features during the NBA offseason.
              </div>
            </div>
        )}

        <Navbar liveGameCount={games.length}/>

        <LiveTicker games={displayedGames}/>

        <div className="max-w-6xl mx-auto px-6 py-10">

          <h2 className="text-3xl font-black mb-8 tracking-wide">

            LIVE GAMES

          </h2>

          <div className="space-y-6">

            {displayedGames.map((game) => (

                <GameCard

                    key={game.id}

                    game={game}

                />

            ))}

          </div>

        </div>
      </div>
  );
}