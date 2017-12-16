import React from 'react';

const TodoItem = (props) => {
	const achievement = (props.todo.achieved === false) ? (
			<button onClick={
		  		() => {
  					props.achieve(props.todo.id)
  				}
  			}>achieve</button>
		) : (
			<button onClick={
		  		() => {
  					props.unachieve(props.todo.id)
  				}
  			}>unachieve</button>
		);
	const achievedStyle = (props.todo.achieved) ? "achieved" : "";
	const style = "todoItem " + achievedStyle;
  	return (
  	<div className={style}> 
  	  	<div className="id">
			{props.todo.order} | {props.todo.id}
		</div>
		<div className="text">
			{props.todo.text}
		</div>
		<div className="removeBtn">
			<button onClick={ () => {props.remove(props.todo.id)} }>remove</button>
		</div>
		<div className="achieveBtn">
	  		{achievement}
	  	</div>
		<div className="upBtn">
			<button onClick={ () => {props.up(props.todo.order)} } disabled={props.todo.order === 0}> ^ </button>
	  	</div>
		<div className="downBtn">
	  		<button onClick={ () => {props.down(props.todo.order)}} disabled={props.downBtnDisabled}> v </button>
	  	</div>
	 </div>
  );
};

export const TodoList = (props) => {
	const todoNode = props.todos.map(
		(todo) => {
			return (
				<TodoItem todo={todo}
					key={todo.id}
					remove={props.remove}
					achieve={props.achieve}
					unachieve={props.unachieve}
					down={props.down}
					up={props.up}
					downBtnDisabled={props.todos.length === todo.order +1}//this avoid sending a new props.todos.length at each adding/removing of item.
					/>
			);
		}
	)
	return (
		<div className="todoList">{todoNode}</div>
	);
};

export class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getCleanState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCleanState(){
	return {text: ''};
  }
  handleChange(event) {
    this.setState({text: event.target.value});
  }
  handleSubmit(event) {
  	if (this.state.text !== ""){
    	this.props.addTodo(this.state.text);
   		this.setState(this.getCleanState());
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          text:
          <input type="text" value={this.state.text} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}