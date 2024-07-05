import { useEffect, useState } from "react";
import "./index.css";

import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const Todolist = () => {
  const [taskAdd, settaskAdd] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleTask = (e) => {
    settaskAdd(e.target.value);
  };

  const handleAddTask = () => {
    if (isEditing) {
      setTasks(
        tasks.map((task) =>
          task.id === currentTask.id ? { ...task, taskName: taskAdd } : task
        )
      );
      setIsEditing(false);
      setCurrentTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        taskName: taskAdd,
        dateTime: new Date().toLocaleString(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    settaskAdd("");
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    settaskAdd(task.taskName);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleCheckbox = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-list-main-container">
      <div className="todo-list-sub-container">
        <h1>Todos</h1>
        <div className="todo-list-input-container">
          <input
            type="text"
            placeholder="Add Your Todos"
            className="todo-list-input"
            onChange={handleTask}
            required
            value={taskAdd}
          />
          <button className="add-button" onClick={handleAddTask}>
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div className="my-tasks-container">
        <h1 className="my-task-heading">My Tasks</h1>
        {tasks.length > 0 &&
          tasks.map((eachTask) => (
            <div className="task-name-container" key={eachTask.id}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={eachTask.completed}
                  onChange={() => handleCheckbox(eachTask.id)}
                />
                <h1
                  className={
                    eachTask.completed ? "task-name completed" : "task-name"
                  }
                >
                  {eachTask.taskName}
                </h1>
              </div>
              <div>
                <span className="task-time">{eachTask.dateTime}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEditTask(eachTask)}
                >
                  <FiEdit className="icon" />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(eachTask.id)}
                >
                  <MdOutlineDelete className="icon" />
                </button>
              </div>
            </div>
          ))}
        <button className="add-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Todolist;
