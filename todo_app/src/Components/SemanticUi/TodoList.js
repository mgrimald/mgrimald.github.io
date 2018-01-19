import React from 'react';
import {TodoEditForm, TodoItem} from "./TodoItem.js"
import { List } from 'semantic-ui-react'

/*export const TodoItemButtons = (props) => {
  const achievementFct = (props.todo.achieved === false) ? () => { props.achieve(props.todo.id) } : () => { props.unachieve(props.todo.id) } 
  const achievementTxt = (props.todo.achieved === false) ? "achieve" : "unachieve" 
  const editingTxt = (props.todo.editing === false) ? "edit" : "annuler";

  return (
    <div className="button_wrapper">
      <div className="editSwitchBtn">
        <button onClick={() => { props.toggleEditing(props.todo.id) } }>
          {editingTxt}
        </button>
      </div>
      <div className="achieveBtn">
        <button onClick={achievementFct}>
          {achievementTxt}
        </button>
      </div>
      <div className="removeBtn">
        <button onClick={ () => {props.remove(props.todo.id)} }>remove</button>
      </div>
      <div className="upBtn">
        <button onClick={ () => {props.up(props.todo.order)} } disabled={props.upBtnDisabled}> ^ </button>
      </div>
      <div className="downBtn">
          <button onClick={ () => {props.down(props.todo.order)}} disabled={props.downBtnDisabled}> v </button>
      </div>
    </div>
  );
}*/

export const TodoList = (props) => {
  const todoNode = props.todos.map(
    (todo) => {
      if (todo.editing === true) {
        return (
          <List.Item key={"LTodoItem_".concat(todo.id)}>
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
          </List.Item>
        );
      } else {
        return (
          <List.Item key={"LTodoItem_".concat(todo.id)}>
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
          </List.Item>
        );
      }
    }
  )
  return (
    <List as="div" relaxed >{todoNode}</List>
  );
};
