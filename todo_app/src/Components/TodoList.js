import React from 'react';
import {TodoEditForm, TodoItem} from "./TodoItem.js"

export const TodoList = (props) => {
  const todoNode = props.todos.map(
    (todo) => {
      if (todo.editing === true) {
        return (
        <TodoEditForm
          todo={todo}
          key={"TodoEditForm_".concat(todo.id)}
          remove={props.remove}
          edit={props.edit}
          achieve={props.achieve}
          unachieve={props.unachieve}
          toggleEditing={props.toggleEditing}
          down={props.down}
          up={props.up}
          upBtnDisabled={todo.order === 0}
          downBtnDisabled={props.todos.length === todo.order +1}//this avoid sending a new props.todos.length at each adding/removing of item.
        />
        );
      } else {
        return (
            <TodoItem
          todo={todo}
          key={"TodoItem_".concat(todo.id)}
          remove={props.remove}
          edit={props.edit}
          achieve={props.achieve}
          unachieve={props.unachieve}
          toggleEditing={props.toggleEditing}
          down={props.down}
          up={props.up}
          upBtnDisabled={todo.order === 0}
          downBtnDisabled={props.todos.length === todo.order +1}//this avoid sending a new props.todos.length at each adding/removing of item.
          />
        );
      }
    }
  )
  return (
    <div className="todoList wrapper">{todoNode}</div>
  );
};
