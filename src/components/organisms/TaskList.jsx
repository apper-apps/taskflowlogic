import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/organisms/TaskItem";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onAddTask 
}) => {
  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        message="No tasks match your current filters. Try adjusting your search or create a new task."
        actionText="Create Task"
        onAction={onAddTask}
        icon="Search"
      />
    );
  }
  
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;