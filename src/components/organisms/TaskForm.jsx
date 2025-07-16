import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ 
  task = null, 
  categories = [],
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
        category: task.category || ""
      });
    }
  }, [task]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };
      
      await onSubmit(taskData);
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormField
        label="Task Title"
        required
        error={errors.title}
      >
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title..."
          error={!!errors.title}
        />
      </FormField>
      
      <FormField
        label="Description"
        error={errors.description}
      >
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter task description..."
          rows={3}
          error={!!errors.description}
        />
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Priority"
          required
          error={errors.priority}
        >
<Select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            error={!!errors.priority}
          >
            <option key="low" value="low">Low Priority</option>
            <option key="medium" value="medium">Medium Priority</option>
            <option key="high" value="high">High Priority</option>
          </Select>
        </FormField>
        
        <FormField
          label="Category"
          required
          error={errors.category}
        >
          <Select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={!!errors.category}
          >
            <option value="">Select category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
      
      <FormField
        label="Due Date"
        error={errors.dueDate}
      >
        <Input
          type="datetime-local"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          error={!!errors.dueDate}
        />
      </FormField>
      
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          className="flex-1"
        >
          {task ? "Update Task" : "Create Task"}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  );
};

export default TaskForm;