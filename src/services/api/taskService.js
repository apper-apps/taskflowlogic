import { toast } from "react-toastify";

class TaskService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }
  
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          { fieldName: "created_at", sorttype: "DESC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
      return [];
    }
  }
  
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById("task", parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
      toast.error("Failed to fetch task");
      return null;
    }
  }
  
  async create(taskData) {
    try {
      // Only include Updateable fields
      const params = {
        records: [{
          Name: taskData.title,
          Tags: taskData.tags || "",
          title: taskData.title,
          description: taskData.description || "",
          priority: taskData.priority || "medium",
          due_date: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
          completed: "false",
          created_at: new Date().toISOString(),
          completed_at: null,
          category: taskData.category
        }]
      };
      
      const response = await this.apperClient.createRecord("task", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create task");
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }
  
  async update(id, taskData) {
    try {
      // Only include Updateable fields
      const updateData = {
        Id: parseInt(id)
      };
      
      if (taskData.title !== undefined) updateData.title = taskData.title;
      if (taskData.Name !== undefined) updateData.Name = taskData.Name;
      if (taskData.Tags !== undefined) updateData.Tags = taskData.Tags;
      if (taskData.description !== undefined) updateData.description = taskData.description;
      if (taskData.priority !== undefined) updateData.priority = taskData.priority;
      if (taskData.dueDate !== undefined) updateData.due_date = taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null;
      if (taskData.completed !== undefined) updateData.completed = taskData.completed ? "true" : "false";
      if (taskData.completedAt !== undefined) updateData.completed_at = taskData.completedAt;
      if (taskData.category !== undefined) updateData.category = taskData.category;
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord("task", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to update task");
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  
  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord("task", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
}
  }

  async bulkUpdate(taskIds, updateData) {
    try {
      const records = taskIds.map(id => ({
        Id: parseInt(id),
        ...updateData
      }));

      const params = {
        records: records
      };

      const response = await this.apperClient.updateRecord("task", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        return successfulRecords.map(result => result.data);
      }

      return [];
    } catch (error) {
      console.error("Error bulk updating tasks:", error);
      throw error;
    }
  }

  async bulkDelete(taskIds) {
    try {
      const params = {
        RecordIds: taskIds.map(id => parseInt(id))
      };

      const response = await this.apperClient.deleteRecord("task", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length === taskIds.length;
      }

      return false;
    } catch (error) {
      console.error("Error bulk deleting tasks:", error);
      throw error;
    }
  }

  async bulkComplete(taskIds) {
    try {
      const records = taskIds.map(id => ({
        Id: parseInt(id),
        completed: "true",
        completed_at: new Date().toISOString()
      }));

      const params = {
        records: records
      };

      const response = await this.apperClient.updateRecord("task", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to complete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        return successfulRecords.map(result => result.data);
      }

      return [];
    } catch (error) {
      console.error("Error bulk completing tasks:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();