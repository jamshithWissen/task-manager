import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import TasksGrid from "./components/TasksGrid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  const handleInputSubmit = (formData) => {
    let newTasks = [];

    const newtask = {
      ...formData,
      id: Date.now(),
      completed: false,
    };
    if (currentTask) {
      newTasks = tasks.map((task) => {
        if (task.id === formData.id) {
          task = newtask;
        }
        return task;
      });
    } else {
      newTasks = tasks.concat(newtask);
    }
    setTasks(newTasks);
  };

  return (
    <>
      <div className="todoapp">
        <h1>Task Manager</h1>
        <InputForm
          currentTask={currentTask}
          handleInputSubmit={handleInputSubmit}
        />
        <TasksGrid />
      </div>
    </>
  );
}

export default App;
