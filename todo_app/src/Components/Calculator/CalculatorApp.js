
import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';

import { Board } from './Board.js';

export class CalculatorApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};


	}
  	render() {
		return (
			<Switch>
				<Redirect exact path={this.props.match.url + "/"} to={this.props.match.url + "/Calculator"}/>
				<Route exact path={this.props.match.url + "/Calculator"} component={Board} />
				<Route render={() => <div>404 ERROR</div> } />
			</Switch>
		);
  	}
}
