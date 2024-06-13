const TasksGrid = ({ tasks }) => {
  return (
    <div>
      <ul>
        {tasks.map((item) => (
          <li>{item.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TasksGrid;
