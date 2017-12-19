import React from 'react';

export const TodoItemButtons = (props) => {
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
}

export const TodoItem = (props) => {
	const achievedStyle = (props.todo.achieved) ? "achieved" : "";
  let buttons = props.buttons;
  if (props.buttons === undefined)
    buttons = TodoItemButtons;
	const style = "todoItem " + achievedStyle;
  	return (
  	  <div className={style}> 
        <div className="id">
          {props.todo.order} | {props.todo.id}
        </div>
        <div className="text">
          {props.todo.text}
        </div>
        <div className="buttons">
          {buttons(props)}
        </div>
      </div>
    );
};

export class TodoEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	text: props.todo.text,
    	id: props.todo.id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
  }

  handleChange(event) {
  	this.setState({text: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
  	if (this.state.text === ""){
    	this.props.remove(this.state.id);
    }
    else {
    	this.props.edit(this.state.id, this.state.text);
    	if (this.props.todo.editing === true) {
    		this.props.toggleEditing(this.state.id);
    	}
    }
  }

  render() {
  	let todo =  Object.assign({}, this.props.todo);
  	todo.text = this.state.text;
  	const intercept = (id) => {
		if (this.props.todo.text !== this.state.text) {
  			//eslint-disable-next-line
  			if (confirm("are U sure ?"))
  				this.props.toggleEditing(id);
  		}
  		else
  			this.props.toggleEditing(id);
  	}
    return (
    <div>
      <TodoItem 
  			todo={todo}
  			key={"EditingTodoItem_".concat(todo.id)}
  			upBtnDisabled={this.props.upBtnDisabled}
  			downBtnDisabled={this.props.downBtnDisabled}
  			remove={this.props.remove}
  			achieve={this.props.achieve}
  			unachieve={this.props.unachieve}
  			down={this.props.down}
  			up={this.props.up}
  			toggleEditing={intercept}
	    />
      <form onSubmit={this.handleSubmit}>
        <label>
          text:
          <input type="text" value={this.state.text} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
    );
  }
}