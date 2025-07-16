import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskItem from "@/components/organisms/TaskItem";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Checkbox from "@/components/atoms/Checkbox";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onAddTask,
  categories = []
}) => {
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map(task => task.Id)));
    }
  };

  const handleBulkComplete = async () => {
    if (selectedTasks.size === 0) return;
    
    setBulkLoading(true);
    try {
      const taskIds = Array.from(selectedTasks);
      await taskService.bulkComplete(taskIds);
      
      // Update parent component state
      taskIds.forEach(taskId => {
        const task = tasks.find(t => t.Id === taskId);
        if (task) {
          onToggleComplete(taskId);
        }
      });
      
      setSelectedTasks(new Set());
      toast.success(`${taskIds.length} tasks marked as completed!`);
    } catch (error) {
      console.error("Error completing tasks:", error);
      toast.error("Failed to complete some tasks");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.size === 0) return;
    
    const taskIds = Array.from(selectedTasks);
    if (!window.confirm(`Are you sure you want to delete ${taskIds.length} tasks?`)) {
      return;
    }
    
    setBulkLoading(true);
    try {
      await taskService.bulkDelete(taskIds);
      
      // Update parent component state
      taskIds.forEach(taskId => {
        onDeleteTask(taskId);
      });
      
      setSelectedTasks(new Set());
      toast.success(`${taskIds.length} tasks deleted successfully!`);
    } catch (error) {
      console.error("Error deleting tasks:", error);
      toast.error("Failed to delete some tasks");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkCategoryChange = async (newCategoryId) => {
    if (selectedTasks.size === 0 || !newCategoryId) return;
    
    setBulkLoading(true);
    try {
      const taskIds = Array.from(selectedTasks);
      await taskService.bulkUpdate(taskIds, { category: parseInt(newCategoryId) });
      
      // Refresh tasks to show updated categories
      window.location.reload();
      
      setSelectedTasks(new Set());
      toast.success(`${taskIds.length} tasks updated with new category!`);
    } catch (error) {
      console.error("Error updating task categories:", error);
      toast.error("Failed to update some task categories");
    } finally {
      setBulkLoading(false);
    }
  };

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

  const allSelected = selectedTasks.size === tasks.length;
  const someSelected = selectedTasks.size > 0;

  return (
    <div className="space-y-4">
      {/* Bulk Actions Toolbar */}
      <AnimatePresence>
        {someSelected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-md"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  {selectedTasks.size} task{selectedTasks.size === 1 ? '' : 's'} selected
                </span>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkComplete}
                  disabled={bulkLoading}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <ApperIcon name="CheckCircle" size={16} className="mr-1" />
                  Complete
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={bulkLoading}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <ApperIcon name="Trash2" size={16} className="mr-1" />
                  Delete
                </Button>
                
                <Select
                  placeholder="Change Category"
                  value=""
                  onChange={(e) => handleBulkCategoryChange(e.target.value)}
                  disabled={bulkLoading}
                  className="min-w-[140px]"
                >
                  <option value="">Change Category</option>
                  {categories.map(category => (
                    <option key={category.Id} value={category.Id}>
                      {category.Name}
                    </option>
                  ))}
                </Select>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTasks(new Set())}
                  disabled={bulkLoading}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id || `task-${index}`}
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
              isSelected={selectedTasks.has(task.Id)}
              onSelect={() => handleSelectTask(task.Id)}
              showSelection={someSelected}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;