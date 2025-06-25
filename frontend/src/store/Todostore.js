// /store/Todostore.js
import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";


export const useTodo = create((set, get) => ({
  todos: [],
  loading: false,

  formData: {
    description: "",
  },

  setFormData: (formData) => set({ formData }),

  resetForm: () => set({ formData: { description: "" } }),

 addTodo: async (e) => {
  e.preventDefault();
  set({ loading: true });

  try {
    const { formData } = get();

    // ✅ Prevent empty todo
    if (!formData.description.trim()) {
      toast.error("Todo cannot be empty");
      set({ loading: false });
      return;
    }

    await axios.post(`${BASE_URL}/api/todo/add`, formData);
    await get().fetchTodos();
    get().resetForm();
    toast.success("Todo added successfully!");
  } catch (error) {
    console.error("Error adding todo:", error);
    toast.error("Something went wrong while adding.");
  } finally {
    set({ loading: false });
  }
},


fetchTodos: async () => {
  set({ loading: true });
  try {
    const response = await axios.get(`${BASE_URL}/api/todo/all`);
    const todos = response.data.todo || []; 
    set({ todos, error: null });            
  } catch (error) {
    console.error("Error fetching todos:", error);
    toast.error("Something went wrong while fetching.");
  } finally {
    set({ loading: false });
  }
},

setEditTodoId: (id) => set({ editTodoId: id }),

deleteTodo: async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/todo/delete/${id}`);
    await get().fetchTodos();
    toast.success("Todo deleted Sucessfully");
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete todo");
  }
},

updateTodo: async () => {
  const { formData, editTodoId } = get();

  if (!formData.description.trim()) {
    toast.error("Todo cannot be empty");
    return;
  }

  try {
    await axios.put(`${BASE_URL}/api/todo/update/${editTodoId}`, formData);
    await get().fetchTodos();
    get().resetForm();
    set({ editTodoId: null });
    toast.success("Todo updated successfully");
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Failed to update todo");
  }
},



}));
