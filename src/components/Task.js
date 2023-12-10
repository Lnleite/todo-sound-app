import React from "react";

const Task = ({ task, onTaskComplete, onRemoveTask }) => {
  return (
    <div>
      <span>{task.text}</span>
      <input
        type="checkbox"
        value={task.text}
        checked={task?.completed}
        onChange={() => onTaskComplete(task.id)}
      />
      {task?.completed && (
        <button onClick={() => onRemoveTask(task.id)}>X</button>
      )}
    </div>
  );
};

export default Task;
