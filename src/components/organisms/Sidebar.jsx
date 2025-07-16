import React from "react";
import { cn } from "@/utils/cn";
import CategoryChip from "@/components/molecules/CategoryChip";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priorityFilter,
  onPriorityChange,
  isOpen,
  onClose 
}) => {
  const priorityOptions = [
    { value: "all", label: "All Priority", count: 0 },
    { value: "high", label: "High Priority", count: 0 },
    { value: "medium", label: "Medium Priority", count: 0 },
    { value: "low", label: "Low Priority", count: 0 }
  ];
  
  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <ApperIcon name="X" size={20} />
        </button>
      </div>
      
      <div className="flex-1 p-4 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
<div className="space-y-2">
            <CategoryChip
              key="all-tasks"
              category={{ name: "All Tasks", color: "bg-gray-400" }}
              isActive={selectedCategory === "all"}
              onClick={() => onCategoryChange("all")}
              className="w-full justify-start"
            />
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
                taskCount={category.taskCount}
                className="w-full justify-start"
              />
            ))}
          </div>
        </div>
        
        {/* Priority Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Priority</h3>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onPriorityChange(option.value)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  priorityFilter === option.value
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span>{option.label}</span>
                {option.value !== "all" && (
                  <div className={cn(
                    "w-2 h-2 rounded-sm",
                    option.value === "high" && "bg-red-500",
                    option.value === "medium" && "bg-yellow-500",
                    option.value === "low" && "bg-green-500"
                  )} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-full">
        {sidebarContent}
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={onClose}
          />
          <div className="relative w-64 bg-white shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;