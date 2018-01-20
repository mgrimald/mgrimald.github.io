
import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import { HeaderLinks } from "../../HeaderLinks.js";


import { CalculatorApp } from './Calculator.js';
export class GamesApp extends Component {
  	render() {
		const links = [
			{
				to: "Calculator", 
				name: "Calculator"
			}
		];

		return (
			<div>
				<HeaderLinks baseUrl={this.props.match.url} links={links}/>
				<Switch>
					<Redirect exact path={this.props.match.url + "/"} to={this.props.match.url + "/Calculator"}/>
					<Route exact path={this.props.match.url + "/Calculator"} component={CalculatorApp} />
					<Route render={() => <div>404 ERROR</div> } />
				</Switch>
			</div>
		);
  	}
}
