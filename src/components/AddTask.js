import { useState } from "react";
import "./AddTask.css";

const AddTask = ({ handleAddTasks }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (taskText.trim().length > 0) {
      handleAddTasks(taskText);
    }
    setTaskText("");
  };

  return (
    <form className="addTasksComponent" onSubmit={handleSubmitClick}>
      <label>
        Add tasks
        <input
          className="addTaskInput"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </label>
      <button>Add task</button>
    </form>
  );
};

export default AddTask;
