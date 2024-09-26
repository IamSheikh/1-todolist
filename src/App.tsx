import { useState, FormEvent, useEffect } from "react";

interface Task {
  id: number;
  task: string;
  isCompleted: boolean;
}

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const newTask = {
      task,
      id: tasks?.length ? (tasks[tasks.length - 1].id ?? 0) + 1 : 1,
      isCompleted: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };

  return (
    <div className="flex justify-center items-center flex-col mt-4">
      <h1 className="text-4xl font-bold">
        <span className="text-purple-500">Allison Burgers</span> Todo List
      </h1>
      <form onSubmit={handleForm} className="mt-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />

        <button
          type="submit"
          className=" bg-blue-500
          hover:bg-blue-600
          text-white
          font-semibold
          py-2
          px-4
          ml-2
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2"
        >
          Add
        </button>
      </form>

      <ul className="space-y-4 mt-2">
        {tasks.map((t) => {
          return (
            <li className="flex items-center justify-between p-3 flex-grow bg-gray-50 rounded-md shadow w-96">
              <div className="flex items-center flex-wrap">
                <input
                  type="checkbox"
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded`}
                  checked={t.isCompleted}
                  onChange={(e) => {
                    const currentTask = tasks.findIndex((tk) => tk.id === t.id);
                    const updatedTasks = [...tasks];
                    updatedTasks[currentTask].isCompleted = e.target.checked;
                    setTasks(updatedTasks);
                  }}
                />
                <span
                  className={`ml-3 text-gray-800 text-base break-words ${
                    t.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.task}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md text-xs"
                  onClick={() => {
                    const currentTask = tasks.findIndex((tk) => tk.id === t.id);
                    const newPrompt = prompt("Edit task", t.task);
                    if (newPrompt !== "") {
                      const updatedTasks = [...tasks];
                      updatedTasks[currentTask].task = newPrompt ?? "";
                      setTasks(updatedTasks);
                    } else {
                      alert("Task cannot be empty");
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-xs"
                  onClick={() => {
                    const currentTask = tasks.findIndex((tk) => tk.id === t.id);
                    const updatedTasks = [...tasks];
                    updatedTasks.splice(currentTask, 1);
                    setTasks(updatedTasks);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
