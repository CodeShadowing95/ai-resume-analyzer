interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  // Determine badge style and text based on score
  const getBadgeStyles = () => {
    if (score > 70) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-600",
        borderColor: "border-green-200",
        label: "Excellent"
      };
    } else if (score > 49) {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-200",
        label: "À améliorer"
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-600",
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