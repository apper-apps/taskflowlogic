import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import TaskStats from "@/components/molecules/TaskStats";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import { filterTasks, getTaskStats, sortTasksByPriority } from "@/utils/taskHelpers";
import { sortByDueDate } from "@/utils/dateHelpers";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load tasks and categories");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.update(editingTask.id, taskData);
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id ? { ...task, ...taskData } : task
        ));
        toast.success("Task updated successfully!");
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prev => [...prev, newTask]);
        toast.success("Task created successfully!");
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Error saving task:", err);
      toast.error("Failed to save task");
    }
  };
  
  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      
      const updatedTask = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };
      
      await taskService.update(taskId, updatedTask);
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ));
      
      toast.success(updatedTask.completed ? "Task completed!" : "Task reopened!");
    } catch (err) {
      console.error("Error toggling task completion:", err);
      toast.error("Failed to update task");
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
  };
  
  const handlePriorityChange = (priority) => {
    setPriorityFilter(priority);
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  // Filter and sort tasks
  const filteredTasks = filterTasks(
    tasks.filter(task => !task.completed),
    searchQuery,
    selectedCategory,
    priorityFilter
  );
  
  const sortedTasks = sortByDueDate(sortTasksByPriority(filteredTasks));
  
  // Calculate stats
  const stats = getTaskStats(tasks);
  
  // Update category counts
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    taskCount: tasks.filter(task => task.category === category.name && !task.completed).length
  }));
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  
  return (
    <div className="h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddTask={handleAddTask}
        onToggleSidebar={toggleSidebar}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          categories={categoriesWithCounts}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priorityFilter={priorityFilter}
          onPriorityChange={handlePriorityChange}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
        
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-4 lg:p-6 max-w-5xl mx-auto">
            <TaskStats stats={stats} />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedCategory === "all" ? "All Tasks" : 
                 categories.find(c => c.id === selectedCategory)?.name || "Tasks"}
              </h2>
              
<TaskList
                tasks={sortedTasks}
                onToggleComplete={handleToggleComplete}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onAddTask={handleAddTask}
                categories={categories}
              />
            </div>
          </div>
        </main>
      </div>
      
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        categories={categories}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
};

export default Dashboard;