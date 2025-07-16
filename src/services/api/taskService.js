import mockTasks from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...mockTasks];
  }
  
  async getAll() {
    await this.delay(300);
    return [...this.tasks];
  }
  
  async getById(id) {
    await this.delay(200);
    const task = this.tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }
  
  async create(taskData) {
    await this.delay(400);
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      category: taskData.category,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    this.tasks.push(newTask);
    return { ...newTask };
  }
  
  async update(id, taskData) {
    await this.delay(300);
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...taskData,
      id: this.tasks[index].Id
    };
    
    return { ...this.tasks[index] };
  }
  
  async delete(id) {
    await this.delay(250);
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    this.tasks.splice(index, 1);
    return true;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const taskService = new TaskService();