import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };
  
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }
  };
  
  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  };
  
  const toggleTaskCompletion = async (id) => {
    try {
      const task = tasks.find(t => t.Id === parseInt(id));
      if (!task) return;
      
      const updatedTask = await taskService.update(id, {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === parseInt(id) ? updatedTask : t
      ));
      
      return updatedTask;
    } catch (err) {
      console.error("Error toggling task completion:", err);
      throw err;
    }
  };
  
  useEffect(() => {
    loadTasks();
  }, []);
  
  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  };
};