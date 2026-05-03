interface ROIBadgeProps {
  verdict: string;
  score?: number;
  size?: "sm" | "md" | "lg";
}

const colorMap: Record<string, string> = {
  "Strong ROI": "bg-green-100 text-green-800 border-green-300",
  "Moderate ROI": "bg-amber-100 text-amber-800 border-amber-300",
  "Poor ROI": "bg-red-100 text-red-800 border-red-300",
};

const sizeMap = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export default function ROIBadge({
  verdict,
  score,
  size = "md",
}: ROIBadgeProps) {
  const colors = colorMap[verdict] ?? "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${colors} ${sizeMap[size]}`}
    >
      {score !== undefined && <span>{score}</span>}
      <span>{verdict}</span>
    </span>
  );
}
