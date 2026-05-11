import {games} from "../../mock/games.ts";

export default function Navbar() {
  return (
    <div className="w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-wider">
            CLUTCH<span className="text-yellow-400">FACTOR</span>
          </h1>

          <p className="text-xs text-gray-400 tracking-[0.3em]">
            LIVE NBA WIN PROBABILITY
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {games.length} games live
        </div>
      </div>
    </div>
  );
}