import { useState, useEffect } from "react";
import { categoryService } from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };
  
  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      console.error("Error creating category:", err);
      throw err;
    }
  };
  
  const updateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await categoryService.update(id, categoryData);
      setCategories(prev => prev.map(category => 
        category.Id === parseInt(id) ? updatedCategory : category
      ));
      return updatedCategory;
    } catch (err) {
      console.error("Error updating category:", err);
      throw err;
    }
  };
  
  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(category => category.Id !== parseInt(id)));
    } catch (err) {
      console.error("Error deleting category:", err);
      throw err;
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};