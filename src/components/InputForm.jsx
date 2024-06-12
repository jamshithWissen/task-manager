import { useState } from "react";

const InputForm = ({ handleInputSubmit, currentTask }) => {
  const initialFormData = {
    task: "",
    priority: "",
  };
  const [formData, setFormData] = useState(currentTask || initialFormData);

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
      <form>
        <h2>Add task</h2>
        <div className="formItem">
          <label htmlFor="task" className="">
            Task :
          </label>
          <input
            type="text"
            className=""
            id="task"
            placeholder="Enter Task"
            name="TaskName"
            value={formData.task}
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
            onChange={updateForm}
          >
            <option value="high">high</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button className="submit" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
