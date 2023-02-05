import React from "react";
import axios from "axios";

import "./List.scss";
import classNames from "classnames";
import Badge from "../Badge";

import removeSvg from "./../../assets/img/remove.svg";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  console.log(items);
  const onRemoveList = item => {
    if (window.confirm("Удалить")) {
      console.log(item);
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && item.id === activeItem.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && `  (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              onClick={() => onRemoveList(item)}
              className="list__remove-icon"
              src={removeSvg}
              alt="remove icon"
            ></img>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
