import React from 'react';
import { Button, Grid, Segment, Confirm, Form} from 'semantic-ui-react'

export const TodoItemButtons = (props) => {
  const achievementFct = (props.todo.achieved === false) ? () => { props.achieve(props.todo.id) } : () => { props.unachieve(props.todo.id) } 
  const achievementTxt = (props.todo.achieved === false) ? "achieve" : "unachieve" 
  const editingTxt = (props.todo.editing === false) ? "edit" : "annuler";

  return (
    <div>
      <Button onClick={() => { props.toggleEditing(props.todo.id) } }>
        {editingTxt}
      </Button>
      <Button  onClick={achievementFct}>
        {achievementTxt}
      </Button>
      <Button onClick={ () => {props.remove(props.todo.id)} }>remove</Button>
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
      <div>
      <Button attached='top' onClick={ () => {props.up(props.todo.order)} } disabled={props.upBtnDisabled}> ^ </Button>
      <Segment attached>
      <Grid columns={3} relaxed className={style}>
        <Grid.Column>
          <Segment basic className="id">
            {props.todo.order} | {props.todo.id}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic  className="text">
            {props.todo.text}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic  className="buttons">
          {buttons(props)}
          </Segment>
        </Grid.Column>
      </Grid>

      </Segment>
      <Button attached='bottom' onClick={ () => {props.down(props.todo.order)}} disabled={props.downBtnDisabled}> v </Button>

      </div>
    );
};



export class TodoEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	text: props.todo.text,
    	id: props.todo.id,
      open: false
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
        this.setState({ open: true })
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
      
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>
            text:
          </label>
          <input type="text" value={this.state.text} onChange={this.handleChange} />
        <Button type='submit'>Save</Button>
        </Form.Field>
      </Form>
      <Confirm
          open={this.state.open}
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onCancel={() => {this.setState({ open: false })}}
          onConfirm={() => {this.props.toggleEditing(this.state.id); this.setState({ open: false })} }
        />
    </div>
    );
  }
}