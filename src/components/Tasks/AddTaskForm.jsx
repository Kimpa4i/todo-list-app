import React from "react";
import axios from "axios";

import addSvg from "../../assets/img/add.svg";

export default ({ list, onAddTask }) => {
  const [formVisible, setFormVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  console.log(inputValue);
  const toogleFormVisible = () => {
    setFormVisible(!formVisible);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    console.log(obj);
    //{listId: 2, text: 'qwert', completed: false, id: 11}

    //1

    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        toogleFormVisible();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!formVisible ? (
        <div onClick={toogleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="добавить новую задачу"></img>
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field field-form"
            type="text"
            placeholder="Текст задачи"
          ></input>
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={toogleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};
