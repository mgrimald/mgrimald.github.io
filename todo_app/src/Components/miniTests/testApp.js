
import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';

import { AllClocks, Clock } from './Clock.js';
import { HeaderLinks } from "../../HeaderLinks.js";

export class TestApp extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};

	}
	render() {
		const links = [
			{
				to: "clock", 
				name: "clock"
			},
			{
				to: "allClocks",
				name: "all these clocks"
			},
			{
				to: "allTestes",
				name: "all tests"
			}
		];
		return (
			<div>
				<HeaderLinks  baseUrl={this.props.match.url} links={links}/>
				<Switch>
					<Redirect exact path={this.props.match.url} to={this.props.match.url + "/" + links[0].to}/>
					<Route exact path={this.props.match.url + "/" + links[0].to} component={Clock} />
					<Route exact path={this.props.match.url + "/" + links[1].to} component={AllClocks} />
					<Route exact path={this.props.match.url + "/" + links[2].to} component={AllClocks} />
					<Route render={() => <div>404 ERROR</div> } />
				</Switch>
			</div>
		);
	}
}
