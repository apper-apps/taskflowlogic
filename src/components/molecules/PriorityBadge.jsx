import React from "react";
import Badge from "@/components/atoms/Badge";
import { getPriorityColor, getPriorityText } from "@/utils/taskHelpers";

const PriorityBadge = ({ priority, size = "sm" }) => {
  const colorClass = getPriorityColor(priority);
  const text = getPriorityText(priority);
  
  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-sm ${colorClass} mr-2`} />
      <Badge 
        variant="default" 
        size={size}
        className="text-gray-700"
      >
        {text}
      </Badge>
    </div>
  );
};

export default PriorityBadge;