import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: {
    minute: number;
    probability: number;
  }[];
};

export default function MomentumChart({
  data,
}: Props) {
  return (
    <div className="panel rounded-3xl p-6 h-[320px]">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Momentum
        </h2>

        <p className="text-gray-400">
          Live win probability changes
        </p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>

          <XAxis
            dataKey="minute"
            stroke="#7f8db0"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="probability"
            stroke="#ffb400"
            fill="#ffb40033"
            strokeWidth={4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}