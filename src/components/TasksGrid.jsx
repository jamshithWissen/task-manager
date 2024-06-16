const TasksGrid = ({ tasks, handleComplete, handleDelete, handleEdit }) => {
  return (
    <div className="tasksContainer">
      <h2>My Tasks</h2>
      {tasks.map((task, index) => (
        <div key={index} className="taskContainer">
          <input
            type="checkbox"
            value={task.completed}
            onChange={(e) => handleComplete(e, task?.id)}
          />
          <div className="taskItem">
            <div className={task.completed ? "strike" : ""}>
              Name: {task?.name}
            </div>
            <div className={task.completed ? "strike" : ""}>
              Priority: {task.priority}
            </div>
          </div>
          <div className="taskActions">
            <button
              className="taskButton"
              onClick={(e) => handleEdit(e, task.id)}
            >
              Edit
            </button>
            <button
              className="taskButton"
              onClick={(e) => handleDelete(e, task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksGrid;
