import React, { Component } from 'react';
import { TodoForm, TodoList } from './Todo.js';


export class TodoApp extends Component {
	constructor(props) {
		super(props);
		let datas = [
			this.createTodo(0, "test1", 0),
			this.createTodo(1, "test 2", 1),
			this.createTodo(2, "test 3", 2)
		];
		this.state = {
			data: datas,
			todo_id: datas.length,
		}
		
		this.addTodo = this.addTodo.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleAchieve = this.handleAchieve.bind(this);
		this.handleUnachieve = this.handleUnachieve.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleOrderUp = this.handleOrderUp.bind(this);
		this.handleOrderDown = this.handleOrderDown.bind(this);
	}
	createTodo(id, text, order=0, achieved=false){
		const todo = {
			text: text, 
			id: id,
			order: order,
			achieved: achieved
		};
		return todo;
	}
	addTodo(val){
		let data = this.state.data;
		const todo = this.createTodo(this.state.todo_id, val);
		data.forEach((todo) => todo.order++);
		data.unshift(todo);
		this.setState({data: data, todo_id:this.state.todo_id + 1});
	}
	handleAchieve(id) {
		let data = this.state.data;
		const index = data.findIndex((todo) => {return (todo.id === id)});
		data[index].achieved = true;
		this.setState({data: data});
	}
	handleUnachieve(id) {
		const index = this.state.data.findIndex((todo) => {return (todo.id === id)});
		const data = this.state.data;
		data[index].achieved = false;
		this.setState({data: data});
	}
	handleRemove(id) {
		const remains = this.state.data.filter(todo => todo.id !== id)
		let c = 0;
		remains.forEach((todo) => todo.order = c++);
		this.setState({data: remains});
	}
	swapPosition(order, order_swap){
		const index = this.state.data.findIndex((todo) => {return (todo.order === order)});
		const index_swap = this.state.data.findIndex((todo) => {return (todo.order === order_swap)});
		if (index < 0 || index_swap < 0){
			return this.state.data;
		}
		const data = this.state.data;
		console.log("data[index]: ", data[index]);
		console.log("data[index_swap]: ", data[index_swap]);
		let tmp = data[index];
		data[index] = data[index_swap];
		data[index_swap] = tmp;
		data[index].order = order;
		data[index_swap].order = order_swap;
		console.log("data[index]: ", data[index]);
		console.log("data[index_swap]: ", data[index_swap]);
		return data;
	}
	handleOrderUp(order){
		console.log("order up", order);
		const data = this.swapPosition(order, order -1)
		this.setState({data: data});
	}
	handleOrderDown(order){
		console.log("order down", order);
		const data = this.swapPosition(order, order +1)
		this.setState({data: data});
	}
	handleEdit(id, text) {
		let data = this.state.data;
		const index = data.findIndex((todo) => {return (todo.id === id)});
		if (index >= 0) {
			data[index].text = text;
		}
		else {
			const todo = {
				text: text, 
				id: window.id++, 
				achieved: false
			};
			data.push(todo);
		}
		this.setState({data: data});
	}
  	render() {
    	return (
      		<div> 
        		<TodoForm 
        			addTodo={this.addTodo}
        			editTodo={this.handleEdit} />
        		<TodoList 
        			todos={this.state.data}
        			remove={this.handleRemove}
        			achieve={this.handleAchieve}
        			unachieve={this.handleUnachieve}
        			up={this.handleOrderUp}
        			down={this.handleOrderDown}
        		 />
      		</div>
    	);
  	}
}

