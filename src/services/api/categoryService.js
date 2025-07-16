import mockCategories from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...mockCategories];
  }
  
  async getAll() {
    await this.delay(200);
    return [...this.categories];
  }
  
  async getById(id) {
    await this.delay(150);
    const category = this.categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }
  
  async create(categoryData) {
    await this.delay(300);
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color,
      taskCount: 0
    };
    
    this.categories.push(newCategory);
    return { ...newCategory };
  }
  
  async update(id, categoryData) {
    await this.delay(250);
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...categoryData,
      id: this.categories[index].Id
    };
    
    return { ...this.categories[index] };
  }
  
  async delete(id) {
    await this.delay(200);
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories.splice(index, 1);
    return true;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const categoryService = new CategoryService();