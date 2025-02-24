"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, CheckCircle } from "lucide-react";

interface Task {
  text: string;
  completed: boolean;
}
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  const addTask = (): void => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index: number): void => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const deleteTask = (index: number): void => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">To-Do List</h2>
        <div className="flex gap-2 mb-4">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1"
          />
          <Button onClick={addTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 rounded-lg bg-white shadow-sm ${
                t.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <span onClick={() => toggleTask(index)} className="cursor-pointer">
                {t.text}
              </span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => toggleTask(index)}>
                  <CheckCircle className={t.completed ? "text-green-500" : "text-gray-400"} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteTask(index)}>
                  <Trash2 className="text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
