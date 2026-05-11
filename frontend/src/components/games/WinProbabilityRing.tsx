import { motion } from "framer-motion";

type Props = {
  probability: number;
  color?: string;
};

export default function WinProbabilityRing({
  probability,
  color = "#ffb400",
}: Props) {

  const circumference = 440;
  const offset =
    circumference - (probability / 100) * circumference;

  return (
    <div className="relative w-[180px] h-[180px]">

      <svg
        className="rotate-[-90deg]"
        width="180"
        height="180"
      >

        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="#1f2937"
          strokeWidth="12"
          fill="transparent"
        />

        <motion.circle
          cx="90"
          cy="90"
          r="70"
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5 }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key={probability}
          initial={{ scale: 1.4, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-black text-yellow-400"
        >
          {probability}%
        </motion.div>

        <div className="text-sm tracking-widest text-gray-400">
          WIN PROBABILITY
        </div>
      </div>
    </div>
  );
}
