import { useEffect, useState } from "react";

const InputForm = ({ handleInputSubmit, currentTask }) => {
  const initialFormData = {
    name: "",
    priority: "high",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    currentTask && setFormData(currentTask);
  }, [currentTask]);

  const updateForm = (e) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    handleInputSubmit(formData);
  };

  return (
    <div className="inputContainer">
      <form onSubmit={handleFormSubmit}>
        <h2>
          {currentTask ? `Edit Task : ${currentTask?.name}` : "Add a new task"}
        </h2>
        <div className="formItem">
          <label htmlFor="task" className="">
            Task :
          </label>
          <input
            type="text"
            className=""
            id="task"
            placeholder="Enter Task"
            name="name"
            value={formData.name}
            required
            onChange={updateForm}
          />
        </div>
        <div className="formItem">
          <label htmlFor="priority">Priority:</label>
          <select
            className="select"
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={updateForm}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="footer">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
