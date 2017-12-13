import React from 'react';

const Todo = (props) => {
  return (
  	<li onClick={
  		() => {
  			props.remove(props.todo.id)
  		}
	}> 
  		{props.todo.id} : {props.todo.text}
	</li>
  );
};

export const TodoList = (props) => {
	const todoNode = props.todos.map(
		(todo) => {
			return (
				<Todo todo={todo} key={todo.id} remove={props.remove} />
			);
		}
	)
	return (
		<ul>{todoNode}</ul>
	);
};

export const TodoForm = (props) => {
	let input;

	return (
		<div>
			<input ref={
				node => {
					input = node; //??????????????????????????????
				}
			} />
			<button onClick={() => {
				props.addTodo(input.value)
				input.value = ''
			}
			} >
				+ (texte du bouton)
			</button>
		</div>
	);
};