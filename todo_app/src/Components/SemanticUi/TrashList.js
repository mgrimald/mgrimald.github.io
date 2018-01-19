import React from 'react';
import {TodoItem} from "./TodoItem.js"
import { Button, List } from 'semantic-ui-react'

export const TrashList = (props) => {
  const trashNodes = props.trashes.map(
    (todo) => {
      return (
        <List.Item key={"LTrashItem_".concat(todo.id)}>
          <TodoItem
            todo={todo}
            key={"TrashItem_".concat(todo.id)}
            buttons={TrashButtons}
            remove={props.remove}
            edit={props.edit}
            achieve={props.achieve}
            unachieve={props.unachieve}
            toggleEditing={props.toggleEditing}
            down={props.down}
            up={props.up}
            restore={props.restore}
            upBtnDisabled={todo.order === 0}
            downBtnDisabled={props.trashes.length === todo.order +1}
          />
        </List.Item>
      );
    }
  )
  return (
    <List className="" relaxed >{trashNodes}</List>
  );
};

export const TrashButtons = (props) => {
    return (
      <div className="button_wrapper">
        <Button negative onClick={ () => {props.remove(props.todo.id)} }>erase</Button>
        <Button onClick={ () => {props.restore(props.todo.id)} }>restore</Button>
        <Button onClick={ () => {props.archive(props.todo.id)} }>DONT CLICK</Button>
      </div>
    );
};