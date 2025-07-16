import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryChip = ({ 
  category, 
  isActive = false, 
  onClick, 
  taskCount = 0,
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95",
        isActive 
          ? "bg-primary text-white shadow-lg" 
          : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary",
        className
      )}
    >
      <div 
        className={cn(
          "w-2 h-2 rounded-full mr-2",
          category.color
        )}
      />
      <span>{category.name}</span>
      {taskCount > 0 && (
        <span className={cn(
          "ml-2 px-1.5 py-0.5 text-xs rounded-full",
          isActive 
            ? "bg-white/20 text-white" 
            : "bg-gray-100 text-gray-600"
        )}>
          {taskCount}
        </span>
      )}
    </button>
  );
};

export default CategoryChip;