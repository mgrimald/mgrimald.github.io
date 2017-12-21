/* eslint no-cond-assign: 0 */

import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';

import { TodoForm } from './TodoForm.js';
import { TodoList } from './TodoList.js';
import { TrashList } from "./TrashList";

export class TodoApp extends Component {
	constructor(props) {
		super(props);
		let datas = [
			this.createTodo(0, "test1", 0),
			this.createTodo(1, "test 2", 1),
			this.createTodo(2, "test 3", 2)
		];
		let trashes = [
			this.createTodo(3, "trash bin 1", 0),
			this.createTodo(4, "trash bin 2", 1),
			this.createTodo(5, "trash bin 3", 2),
		];
		this.state = {
			data: datas,
			todo_id: datas.length + trashes.length,
			trashBin: trashes
		}

		this.addTodo = this.addTodo.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleAchieve = this.handleAchieve.bind(this);
		this.handleUnachieve = this.handleUnachieve.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleOrderUp = this.handleOrderUp.bind(this);
		this.handleOrderDown = this.handleOrderDown.bind(this);
		this.handleOrderUpTrash = this.handleOrderUpTrash.bind(this);
		this.handleOrderDownTrash = this.handleOrderDownTrash.bind(this);
		this.toggleEditing = this.toggleEditing.bind(this);
		this.emptyTrashBin = this.emptyTrashBin.bind(this);
		this.restore = this.restore.bind(this);
	}
	createTodo(id, text, order=0, achieved=false){
		const todo = {
			text: text,
			id: id,
			order: order,
			achieved: achieved,
			editing: false
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
	emptyTrashBin(){
		this.setState({trashBin: []});
	}
	handleRemove(id) {
		const data = this.state.data;
		const trashes = this.state.trashBin;
		let index;

		if ((index = data.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			const removed = data.splice(index, 1);
			let c = 0;
			data.forEach((todo) => todo.order = c++);
			trashes.unshift(removed[0]);
		}
		else if ((index = trashes.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			trashes.splice(index, 1);
		}
		let d = 0;
		trashes.forEach((todo) => todo.order = d++);
		this.setState({data: data, trashBin: trashes});
	}
	restore(id) {
		const data = this.state.data;
		const trashes = this.state.trashBin;
		let index;

		if ((index = trashes.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			const removed = trashes.splice(index, 1);
			let c = 0;
			trashes.forEach((todo) => todo.order = c++);
			data.unshift(removed[0]);
		}
		let d = 0;
		data.forEach((todo) => todo.order = d++);
		this.setState({data: data, trashBin: trashes});
	}
	handleAchieve(id) {
		const data = this.state.data;
		const trashes = this.state.trashBin;
		let index;

		if ((index = data.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			data[index].achieved = true;
			this.setState({data: data});
		}
		else if ((index = trashes.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			trashes[index].achieved = true;
			this.setState({trashBin: trashes});
		}
	}
	handleUnachieve(id) {
		const data = this.state.data;
		const trashes = this.state.trashBin;
		let index;

		if ((index = data.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			data[index].achieved = false;
			this.setState({data: data});
		}
		else if ((index = trashes.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			trashes[index].achieved = false;
			this.setState({trashBin: trashes});
		}
	}
	toggleEditing(id){
		const data = this.state.data;
		const trashes = this.state.trashBin;
		let index;

		if ((index = data.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			data[index].editing = !data[index].editing;
			this.setState({data: data});
		}
		else if ((index = trashes.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			trashes[index].editing = !trashes[index].editing;
			this.setState({trashBin: trashes});
		}
	}
	handleEdit(id, text) {
		const data = this.state.data;
		const trashes = this.state.trashBin;
		let index;

		if ((index = data.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			data[index].text = text;
			this.setState({data: data});
		}
		else if ((index = trashes.findIndex((todo) => {return (todo.id === id)})) >= 0) {
			trashes[index].text = text;
			this.setState({trashBin: trashes});
		}
		else {
			const todo = this.addTodo(text);
			data.push(todo);
			this.setState({data: data});
		}
	}
	swapPosition(order, order_swap, list){
		const index = list.findIndex((todo) => {return (todo.order === order)});
		const index_swap = list.findIndex((todo) => {return (todo.order === order_swap)});
		if (index < 0 || index_swap < 0){
			return list;
		}
		let tmp = list[index];
		list[index] = list[index_swap];
		list[index_swap] = tmp;
		list[index].order = order;
		list[index_swap].order = order_swap;
		return list;
	}
	handleOrderUpTrash(order){
		const trashes = this.swapPosition(order, order -1, this.state.trashBin);
		this.setState({trashBin: trashes});
	}
	handleOrderDownTrash(order){
		const trashes = this.swapPosition(order, order +1, this.state.trashBin);
		this.setState({trashBin: trashes});
	}
	handleOrderUp(order){
		const data = this.swapPosition(order, order -1, this.state.data);
		this.setState({data: data});
	}
	handleOrderDown(order){
		const data = this.swapPosition(order, order +1, this.state.data);
		this.setState({data: data});
	}

  	render() {
		const trashListProps = {
			trashes: this.state.trashBin,
			todos: this.state.data,
			remove: this.handleRemove,
			edit: this.handleEdit,
			achieve: this.handleAchieve,
			unachieve: this.handleUnachieve,
			up: this.handleOrderUpTrash,
			down: this.handleOrderDownTrash,
			restore: this.restore,
			toggleEditing: this.toggleEditing,
		}
		const todoListProps = {
			todos: this.state.data,
			remove: this.handleRemove,
			edit: this.handleEdit,
			achieve: this.handleAchieve,
			unachieve: this.handleUnachieve,
			up: this.handleOrderUp,
			down: this.handleOrderDown,
			toggleEditing: this.toggleEditing,
		}
    	return (
		<div>
    		<Switch>
    			<Route exact path="/" render={()=> <Redirect to="/todoApp"/>} />
      			<Route exact path="/todoApp/" render={() => (
      				  <div> 
        				<TodoForm addTodo={this.addTodo} />
      					<TodoList {...todoListProps} />
      				  </div>
      				)
      			} />
      			<Route exact path="/todoApp/trashBin/" render={() => (
      				  <div> 
      				  	{
      				  	  (trashListProps.trashes.length !== 0) ? (<button onClick={this.emptyTrashBin}> empty all trashes </button>) : (<div>There is no trashes here</div>)
      					}
      					<TrashList {...trashListProps} /> 
      				  </div>
      				)
      			} />
      			<Route render={() => <div>404 ERROR</div> } />
      		</Switch>
      	</div>
    	);
  	}
}

/*
      		
*/