type Event = {
  time: string;
  text: string;
};

type Props = {
  events: Event[];
};

export default function PlayByPlayFeed({
  events,
}: Props) {
  return (
    <div className="panel rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Play By Play
      </h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="border-b border-white/5 pb-4"
          >
            <div className="text-yellow-400 text-sm font-bold">
              {event.time}
            </div>

            <div className="text-gray-200">
              {event.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}