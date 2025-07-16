import { format, isToday, isTomorrow, isYesterday, isPast, isFuture } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return "Today";
  } else if (isTomorrow(dateObj)) {
    return "Tomorrow";
  } else if (isYesterday(dateObj)) {
    return "Yesterday";
  } else {
    return format(dateObj, "MMM dd, yyyy");
  }
};

export const formatDateTime = (date) => {
  if (!date) return "";
  
  const dateObj = new Date(date);
  return format(dateObj, "MMM dd, yyyy 'at' h:mm a");
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return isPast(new Date(dueDate)) && !isToday(new Date(dueDate));
};

export const getDueDateColor = (dueDate) => {
  if (!dueDate) return "text-gray-500";
  
  const dateObj = new Date(dueDate);
  
  if (isOverdue(dueDate)) {
    return "text-error";
  } else if (isToday(dateObj)) {
    return "text-warning";
  } else if (isTomorrow(dateObj)) {
    return "text-info";
  } else {
    return "text-gray-600";
  }
};

export const sortByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};