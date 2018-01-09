import React from 'react';
import { Button, Form } from 'semantic-ui-react'

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>text:</label>
          <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="fill me!"/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}