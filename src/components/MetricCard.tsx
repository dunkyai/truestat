interface MetricCardProps {
  label: string;
  value: string;
  color?: "green" | "amber" | "red" | "default";
}

const colorMap = {
  green: "border-green-500 bg-green-50 text-green-800",
  amber: "border-amber-500 bg-amber-50 text-amber-800",
  red: "border-red-500 bg-red-50 text-red-800",
  default: "border-gray-200 bg-white text-gray-900",
};

export default function MetricCard({
  label,
  value,
  color = "default",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border-2 p-5 transition-shadow hover:shadow-md ${colorMap[color]}`}
    >
      <p className="text-sm font-medium uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
