import React from "react";

import axios from "axios";
import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import AddTaskForm from "./AddTaskForm";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt("название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, { name: newTitle })
        .catch(() => {
          alert("не удолось изменить название списка");
        });
    }
  };

  console.log(list);
  //
  return (
    <div className="tasks">
      <h3 className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="pen"></img>
      </h3>

      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map(task => (
          <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox"></input>
              <label htmlFor={`task-${task.id}`}>
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            <input readOnly value={task.text}></input>
          </div>
        ))}
      </div>
      <AddTaskForm list={list} onAddTask={onAddTask} />
    </div>
  );
};

export default Tasks;
