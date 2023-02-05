import React from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import "./AddListButton.scss";
import closeSvg from "../../assets/img/close.svg";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, selectColor] = React.useState(3);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false); //добавление

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  };

  //добаление объекта в onAddList
  const addlist = () => {
    if (!inputValue) {
      alert("Введите данные");
      return;
    }
    setisLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        //{name: 'b', colorId: 4, id: 8}
        console.log(data);
        const listObj = {
          ...data,
          color: {
            name: colors.filter(color => color.id === selectedColor)[0].name,
          }, //name: 'b', colorId: 4, id: 8, color: {name:pink}}
        };
        console.log(data);
        console.log(listObj);
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="close button"
            className="add-list__popup-close-btn"
          ></img>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название папки"
          ></input>
          <div className="add-list__popup-colors">
            {colors.map(color => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addlist} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};
export default AddList;
