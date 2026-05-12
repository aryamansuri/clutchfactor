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

      try {

        const data =
          await fetchRealGames();

        setGames(data);

      } catch (error) {

        console.error(error);

      } finally {

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

  return (
    <div className="min-h-screen">

      <Navbar liveGameCount={games.length} />

      <LiveTicker games={games} />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-black mb-8 tracking-wide">
          LIVE GAMES
        </h2>

        {loading ? (
          <div className="text-gray-400">
            Loading live games...
          </div>
        ) : (
          <div className="space-y-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}