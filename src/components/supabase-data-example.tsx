"use client";

import { useState, useEffect } from "react";
import { useSupabase } from "@/context/supabase-context";

// Define the type for our data
type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export default function SupabaseDataExample() {
  const { supabase } = useSupabase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setTasks(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }

  async function addTask() {
    if (!newTaskTitle.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from("tasks")
        .insert([{ title: newTaskTitle.trim(), completed: false }]);

      if (error) {
        throw error;
      }

      setNewTaskTitle("");
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to add task");
      console.error("Error adding task:", err);
      setLoading(false);
    }
  }

  async function toggleTaskCompletion(id: number, currentStatus: boolean) {
    try {
      setError(null);

      const { error } = await supabase
        .from("tasks")
        .update({ completed: !currentStatus })
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Update local state
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to update task");
      console.error("Error updating task:", err);
    }
  }

  async function deleteTask(id: number) {
    try {
      setError(null);

      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Update local state
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete task");
      console.error("Error deleting task:", err);
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Supabase Data Example</h2>

      <div className="mb-4 flex">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 px-3 py-2 border rounded-l"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 border border-red-300 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && tasks.length === 0 ? (
        <div className="p-4 text-center">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No tasks found. Add one to get started!
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, task.completed)}
                  className="mr-2"
                />
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>
          Note: This component requires a 'tasks' table in your Supabase
          database with the following schema:
        </p>
        <pre className="p-2 bg-gray-100 rounded mt-1">
          {`id: int8 (primary key)
title: text
completed: boolean
created_at: timestamp (default: now())`}
        </pre>
      </div>
    </div>
  );
}
