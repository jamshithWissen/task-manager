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

  const handleComplete = (e, id) => {
    const newList = tasks.map((item) => {
      if (item?.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTasks(newList);
  };

  const handleDelete = (e, id) => {
    const newList = tasks.filter((item) => item.id !== id);
    setTasks(newList);
  };

  const handleEdit = (e, id) => {
    const task = tasks.find((item) => item.id === id);
    setCurrentTask(task);
  };

  console.log("currentTask", currentTask);

  return (
    <>
      <div className="todoapp">
        <h1>Task Manager</h1>
        <InputForm
          currentTask={currentTask}
          handleInputSubmit={handleInputSubmit}
        />
        <TasksGrid
          tasks={tasks}
          handleComplete={handleComplete}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
