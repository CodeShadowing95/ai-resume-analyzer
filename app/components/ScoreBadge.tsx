interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  // Determine badge style and text based on score
  const getBadgeStyles = () => {
    if (score > 70) {
      return {
        bgColor: "bg-[var(--color-badge-green)]",
        textColor: "text-[var(--color-text-green)]",
        borderColor: "border-green-200",
        label: "Excellent"
      };
    } else if (score > 49) {
      return {
        bgColor: "bg-[var(--color-badge-yellow)]",
        textColor: "text-[var(--color-text-yellow)]",
        borderColor: "border-yellow-200",
        label: "À améliorer"
      };
    } else {
      return {
        bgColor: "bg-[var(--color-badge-red)]",
        textColor: "text-[var(--color-text-red)]",
        borderColor: "border-red-200",
        label: "Critique"
      };
    }
  };

  const { bgColor, textColor, borderColor, label } = getBadgeStyles();

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${bgColor} ${textColor} ${borderColor} shadow-sm`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;