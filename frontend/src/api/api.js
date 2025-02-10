import axios from "axios";

const API_URL = "https://localhost:7223/api";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/task`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getColumns = async () => {
  try {
    const response = await axios.get(`${API_URL}/column`);
    return response.data;
  } catch (error) {
    console.error("Error fetching columns:", error);
    return [];
  }
};

export const addTask = async (taskData) => {
  try {
    await axios.post(`${API_URL}/task`, taskData);
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getStatuses = async () => {
    try {
      const response = await axios.get(`${API_URL}/status`);
      return response.data;
    } catch (error) {
      console.error("Error fetching statuses:", error);
      return [];
    }
  };
  
  export const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  export const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/task/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };
  
  
