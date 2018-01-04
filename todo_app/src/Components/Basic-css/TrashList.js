import React from 'react';
import {TodoItem} from "./TodoItem.js"

export const TrashList = (props) => {
  const trashNodes = props.trashes.map(
    (todo) => {
      return (
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
      );
    }
  )
  return (
    <div className="TrashList wrapper">{trashNodes}</div>
  );
};

export const TrashButtons = (props) => {
    return (
        <div className="button_wrapper">
            <div className="removeBtn">
              <button onClick={ () => {props.remove(props.todo.id)} }>erase</button>
            </div>
            <div className="restoreBtn">
              <button onClick={ () => {props.restore(props.todo.id)} }>restore</button>
            </div>
            <div className="archiveBtn">
              <button onClick={ () => {props.archive(props.todo.id)} }>DONT CLICK</button>
            </div>
            <div className="upBtn">
              <button onClick={ () => {props.up(props.todo.order)} } disabled={props.upBtnDisabled}> ^ </button>
            </div>
            <div className="downBtn">
              <button onClick={ () => {props.down(props.todo.order)}} disabled={props.downBtnDisabled}> v </button>
            </div>
          </div>
    );
};