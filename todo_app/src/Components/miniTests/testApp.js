
import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';

import { AllClocks, Clock } from './Clock.js';

export class TestApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};

	}
  	render() {
		return (
			<Switch>
				<Route exact path={this.props.match.url + "/"} render={()=> <Redirect to={this.props.match.url + "/allClocks"}/>} />
				<Route exact path={this.props.match.url + "/clock"} component={Clock} />
				<Route exact path={this.props.match.url + "/allClocks"} component={AllClocks} />
				<Route exact path={this.props.match.url + "/allTestes"} component={AllClocks} />
				<Route render={() => <div>404 ERROR</div> } />
			</Switch>
		);
  	}
}
