import React from "react";
import { motion } from "framer-motion";
import { formatDate, getDueDateColor, isOverdue } from "@/utils/dateHelpers";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  showSelection = false,
  isSelected = false,
  onSelect = () => {}
}) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };
  
  const handleEdit = () => {
    onEdit(task);
  };
  
  const handleDelete = () => {
    onDelete(task.id);
  };
  
  return (
    <motion.div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200",
        task.completed && "opacity-75"
      )}
      whileHover={{ scale: 1.01 }}
whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start gap-3">
        {showSelection && (
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={isSelected}
              onChange={onSelect}
              className="transition-all duration-300"
            />
          </div>
        )}
        
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            className="transition-all duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                "text-base font-medium text-gray-900 mb-1",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mb-3",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-3 flex-wrap">
                <PriorityBadge priority={task.priority} />
                
                <Badge variant="default" className="bg-gray-100 text-gray-700">
                  {task.category}
                </Badge>
                
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <ApperIcon 
                      name="Calendar" 
                      size={14} 
                      className={cn(
                        getDueDateColor(task.dueDate),
                        isOverdue(task.dueDate) && "text-error"
                      )} 
                    />
                    <span className={cn(
                      "text-sm",
                      getDueDateColor(task.dueDate),
                      isOverdue(task.dueDate) && "text-error font-medium"
                    )}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <ApperIcon name="Edit2" size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-600 p-2"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;