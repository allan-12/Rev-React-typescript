import { useState } from "react";
import { nanoid } from "nanoid";

  export interface Task {
  id: string;
  title: string;
}

const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const addTask = (title: string) => {
    if (title.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const filterTasks = (searchKeyword: string) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return { tasks, addTask, deleteTask, updateTask, filterTasks };
};

export default useTaskManager;
