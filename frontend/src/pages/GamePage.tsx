import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import { teamThemes } from "../styles/teamThemes";

import WinProbabilityRing from "../components/games/WinProbabilityRing";

import MomentumChart from "../components/charts/MomentumChart";

import PlayByPlayFeed from "../components/games/PlayByPlayFeed";

import WhatIfSimulator from "../components/simulator/WhatIfSimulator";

import { teamLogos } from "../assets/teams";

import { stompClient } from "../websocket/gameSocket";

import { motion } from "framer-motion";

import type { Game } from "../types/Game";

import {fetchGameById, fetchGameHistory} from "../api/games";

import type {
  ProbabilitySnapshot
} from "../types/ProbabilitySnapshot";

import type {
  GameEvent
} from "../types/GameEvent";

export default function GamePage() {

  const { id } = useParams();

  const [game, setGame] =
    useState<Game | null>(null);

  const [momentumData, setMomentumData] =
    useState<ProbabilitySnapshot[]>([]);

  const [events, setEvents] =
    useState<GameEvent[]>([
      {
        time: "12:00",
        text: "Game started",
      },
    ]);

    function generateEvent(
      probability: number
    ): string {

      const positiveEvents = [
        "Curry hits a deep three",
        "Warriors on a scoring run",
        "Fast break dunk",
        "Huge defensive stop",
        "Momentum shifting hard",
      ];

      const neutralEvents = [
        "Timeout called",
        "Possession reset",
        "Mid-range jumper",
        "Rebound secured",
      ];

      const negativeEvents = [
        "Turnover committed",
        "Missed transition opportunity",
        "Bad foul called",
        "Shot clock violation",
      ];

      if (probability > 70) {

        return positiveEvents[
          Math.floor(
            Math.random() *
            positiveEvents.length
          )
        ];
      }

      if (probability < 40) {

        return negativeEvents[
          Math.floor(
            Math.random() *
            negativeEvents.length
          )
        ];
      }

      return neutralEvents[
        Math.floor(
          Math.random() *
          neutralEvents.length
        )
      ];
    }

  useEffect(() => {

    async function loadGame() {

      if (!id) return;

      const data =
        await fetchGameById(id);

      setGame(data);

      const history =
        await fetchGameHistory(id);

      setMomentumData(

        history.map(
          (
            snapshot: {
              probability: number
            },

            index: number
          ) => ({

            minute: index + 1,

            probability:
              snapshot.probability,
          })
        )
      );
    }

    loadGame();

    stompClient.onConnect = () => {

      stompClient.subscribe(
        "/topic/games",
        (message) => {

          const updatedGames =
            JSON.parse(message.body);

          const updatedGame =
            updatedGames.find(
              (g: Game) =>
                g.id === Number(id)
            );

          if (updatedGame) {

            setGame(updatedGame);

            setMomentumData((prev) => [

              ...prev,

              {
                minute: prev.length + 1,
                probability:
                  updatedGame.probability,
              },
            ]);

            setEvents((prev) => [
              {
                time: updatedGame.time,

                text: generateEvent(
                  updatedGame.probability
                ),
              },

              ...prev.slice(0, 7),
            ]);
          }
        }
      );
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };

  }, [id]);

  if (!game) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const homeTheme =
      teamThemes[game.homeTeam];

  const awayTheme =
    teamThemes[game.awayTeam];

  return (
    <div className="min-h-screen">

      <Navbar liveGameCount={1} />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="panel rounded-3xl p-8 mb-8 relative overflow-hidden soft-pulse">

          <div
              className="absolute top-0 left-0 w-48 h-48 blur-3xl opacity-30"
              style={{
                background: awayTheme.secondary,
              }}
          />

          <div
              className="absolute bottom-0 right-0 w-48 h-48 blur-3xl opacity-30"
              style={{
                background: homeTheme.primary,
              }}
          />

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">

              <img
                  src={teamLogos[game.awayTeam]}
                  alt={game.awayTeam}
                  className="w-24 h-24 object-contain hover:scale-110 transition-transform duration-300"
              />

              <div>
                <motion.div
                    key={game.awayScore}
                    initial={{
                      scale: 1.4,
                      color: "#4ade80",
                    }}

                    animate={{
                      scale: 1,
                      color: "#ffffff",
                    }}

                    transition={{
                      duration: 0.5,
                    }}

                    className="text-7xl font-black"
                >
                  {game.awayScore}
                </motion.div>

                <div className="text-2xl text-gray-400">
                  {game.awayTeam}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-gray-400 tracking-widest">
                {game.quarter}
              </div>

              <div className="text-4xl font-bold">
                {game.time}
              </div>
            </div>

            <div className="flex items-center gap-6">

              <div className="text-right">
                <motion.div
                    key={game.homeScore}
                    initial={{
                      scale: 1.4,
                      color: "#4ade80",
                    }}

                    animate={{
                      scale: 1,
                      color: "#ffffff",
                    }}

                    transition={{
                      duration: 0.5,
                    }}

                    className="text-7xl font-black"
                >
                  {game.homeScore}
                </motion.div>

                <div className="text-2xl text-gray-400">
                  {game.homeTeam}
                </div>
              </div>

              <img
                  src={teamLogos[game.homeTeam]}
                  alt={game.homeTeam}
                  className="w-24 h-24 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1">

            <div className="panel rounded-3xl p-6 flex flex-col items-center justify-center">

              <WinProbabilityRing
                probability={game.probability}
                color={homeTheme.secondary}
              />

              <div className="mt-6 flex items-center gap-3">

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                <div className="text-sm text-gray-400 tracking-widest">
                  LIVE MODEL UPDATING
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">

            <MomentumChart
              data={momentumData}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <PlayByPlayFeed
            events={events}
          />

          <WhatIfSimulator />
        </div>
      </div>
    </div>
  );
}
