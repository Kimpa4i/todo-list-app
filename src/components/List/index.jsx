import React from "react";
import "./List.scss";
import classNames from "classnames";
import Badge from "../Badge";

import removeSvg from "./../../assets/img/remove.svg";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const onRemoveList = item => {
    if (window.confirm("Удалить")) {
      onRemove(item);
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
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
