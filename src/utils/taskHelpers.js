export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const getPriorityText = (priority) => {
  switch (priority) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return "None";
  }
};

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...tasks].sort((a, b) => {
    const priorityA = priorityOrder[a.priority] || 0;
    const priorityB = priorityOrder[b.priority] || 0;
    
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    // If same priority, sort by created date
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
};

export const filterTasks = (tasks, searchQuery, categoryFilter, priorityFilter) => {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date() && !isToday(new Date(task.dueDate));
  }).length;
  
  return { total, completed, pending, overdue };
};

const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};