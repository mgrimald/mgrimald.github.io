import React, { Component } from 'react';
import { TodoForm, TodoList } from './Todo.js';

window.id = 0;

export class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.addTodo = this.addTodo.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}
	addTodo(val){
		const todo = {text: val, id: window.id++}
		this.state.data.push(todo);
		this.setState({data: this.state.data});
	}
	handleRemove(id) {
		console.log("handleRemove : " + id);
		const remains = this.state.data
			.filter(
				todo => todo.id !== id
			)
		this.setState({data: remains});
	}
  	render() {
    	return (
      		<div> 
        		<TodoForm addTodo={this.addTodo} />
        		<TodoList 
        			todos={this.state.data}
        			remove={this.handleRemove}
        		 />
      		</div>
    	);
  	}
}

