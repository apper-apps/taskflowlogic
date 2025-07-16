import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ stats }) => {
  const statItems = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: "CheckSquare",
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: "CheckCircle2",
      color: "text-success",
      bgColor: "bg-green-100"
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: "Clock",
      color: "text-info",
      bgColor: "bg-blue-100"
    },
    {
      label: "Overdue",
      value: stats.overdue,
      icon: "AlertCircle",
      color: "text-error",
      bgColor: "bg-red-100"
    }
  ];
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
            </div>
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              item.bgColor
            )}>
              <ApperIcon 
                name={item.icon} 
                className={cn("w-5 h-5", item.color)} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;