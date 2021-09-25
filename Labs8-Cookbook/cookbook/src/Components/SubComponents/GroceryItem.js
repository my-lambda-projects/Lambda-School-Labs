import React from "react";
import Checkbox from "./Checkbox";

const GroceryItem = props => {
  return (
    <div
      id={props.ingredient.name}
      className={`list-item ${
        props.ingredient.isCompleted ? "completed" : null
      }`}
    >
      <Checkbox isCompleted={props.ingredient.isCompleted} 
        callbackArg={props.index} callback={props.handleItemClick}>
      </Checkbox>
      <span
        className="item-text"
        onClick={() => props.handleItemClick(props.index)}
      >
        {`${
          props.ingredient.quantity !== "0" ? props.ingredient.quantity : ""
        } ${props.ingredient.name}`}
      </span>
    </div>
  );
};

export default GroceryItem;
