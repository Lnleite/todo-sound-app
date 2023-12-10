// src/components/TodoList.js
import React, { useEffect, useState, useRef } from "react";
import Task from "./Task";
import AddTask from "./AddTask";

import ReactHowler from "react-howler";

const TodoList = () => {
  const mounting = useRef(null);
  const [playSound, setPlaySound] = useState(false);

  const [tasks, setTasks] = useState({});

  useEffect(() => {
    if (mounting.current) {
      const stringIfyTasks = JSON.stringify(tasks);
      localStorage.setItem("tasks", stringIfyTasks);
    } else {
      const tasks = localStorage.getItem("tasks");
      setTasks(JSON.parse(tasks));

      mounting.current = true;
    }
  }, [tasks]);

  const handleTaskComplete = (taskId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[taskId].completed = !updatedTasks[taskId].completed;
    setTasks(updatedTasks);

    if (updatedTasks[taskId].completed) {
      setPlaySound(true);
    } else {
      setPlaySound(false);
    }
  };

  const handleAddTasks = (taskText) => {
    setTasks(() => {
      const id = Date.now();
      const updatedTasks = {
        ...tasks,
        [id]: { id, text: taskText, completed: false },
      };
      return updatedTasks;
    });
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];
    setTasks(updatedTasks);
  };

  const handleStopSounds = () => {
    window.Howler.stop();
    setPlaySound(false);
  };

  return (
    <div>
      <h2>Todo List</h2>
      {Object.entries(tasks).map((task) => {
        return (
          <Task
            key={task[0]}
            task={task[1]}
            onTaskComplete={handleTaskComplete}
            onRemoveTask={handleRemoveTask}
          />
        );
      })}
      <AddTask handleAddTasks={handleAddTasks} />

      <ReactHowler
        src={["iQuestComplete.ogg"]}
        playing={playSound}
        onEnd={() => setPlaySound(false)}
        volume={0.2}
      />
      {playSound && (
        <button onClick={handleStopSounds}>Stop Sound Playing</button>
      )}
    </div>
  );
};

export default TodoList;
