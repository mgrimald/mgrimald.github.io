//file:///D:/Users/Merlin/Pictures/30-days-of-react-ebook-fullstackio.pdf from https://www.fullstackreact.com/30-days-of-react/
import React from 'react';
import PropTypes from 'prop-types' // V4.2
import { Segment, Container } from 'semantic-ui-react'


/* V0 : basis of JSX/react */
/* 
	JSX element are composed of 1 open tag and 1 closed tag
*/

// eslint-disable-next-line
class ClockV0 extends React.Component {
	render() {
		return <div>05:35:55PM</div>;
	}
}


/* V1 : first rought draft */
/*
	when you use JSX on several lines, you must put parentheses around them :
		return (
			<div>
				text
			</div>
		)
	when you include js inside JSX, you must put "accolade" : "{" "}" :
		return (
			<div>
				{1 + 1}
			</div>
		)
*/

class ClockV1 extends React.Component {
	render() {
		const currentTime = new Date(),
			hours = currentTime.getHours(),
			minutes = currentTime.getMinutes(),
			seconds = currentTime.getSeconds(),
			ampm = hours >= 12 ? 'pm' : 'am';
		return (
			<div>
				{
					hours === 0 ? 12 : (hours > 12) ? hours - 12 : hours
				}
				{ ":" }
				{
					minutes > 9 ? minutes : `0${minutes}` 
				}
				{ ":" }
				{
					seconds > 9 ? seconds : `0${seconds}` 
				}
			{ampm}
			</div>
		)
}
}

/* V2 : separating  view and data by using props */
const ClockDisplay = (props) => {
	const {hours, minutes, seconds, ampm} = props; // ES6
	return (
		<div>
			{
				hours === 0 ? 12 : (hours > 12) ? hours - 12 : hours
			}
			{ ":" }
			{
				minutes > 9 ? minutes : `0${minutes}` 
			}
			{ ":" }
			{
				seconds > 9 ? seconds : `0${seconds}` 
			}
			{ampm}
 		</div>
 	);
}


class ClockV2 extends React.Component {
 	render() {
 		const currentTime = new Date(),
 			hours = currentTime.getHours(),
 			minutes = currentTime.getMinutes(),
 			seconds = currentTime.getSeconds(),
 			ampm = hours >= 12 ? 'pm' : 'am';
 		return <ClockDisplay hours={hours} minutes={minutes} seconds={seconds} ampm={ampm} />
	}
}

/* V3 : put data in state */

class ClockV3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {time: this.getTime()}
	}
	getTime() {
		const currentTime = new Date();
		return {
			time: currentTime,
			hours: currentTime.getHours(),
			minutes: currentTime.getMinutes(),
			seconds: currentTime.getSeconds(),
			ampm: currentTime.getHours() >= 12 ? 'pm' : 'am'
		};
	}
	render() {
		return (
			<ClockDisplay 
				hours={this.state.time.hours} 
				minutes={this.state.time.minutes} 
				seconds={this.state.time.seconds} 
				ampm={this.state.time.ampm} 
			/>
 		);
	}
}

/* V4 : use timeout to update the state + Lifecycle Hooks*/
/*
	setState:  update the state and trigger the component to rerender.
	setTimeout / clearTimeout : 
	bind : because "object" and "this" system in JavaScript
	
	Lifecycle Hooks :
		componentWillMount() : usefull to fetch data
		componentDidMount() : is called after the component has been MOUNTED : put onto the real DOM.
		componentWillUnmount() : is called right before the component will be removed from the real DOM.

	so : 
		<ClockV4> is called 
		-> constructor
		-> componentWillMount
		-> render
		-> componentDidMount (once it's updated inside the REAL DOM)
			=> call setTimer => call setTimeout =>  call (1 sec later) updateClock => call setState => update state, call a new render, then call setTimer => whole line all over again

*/

class ClockV4 extends ClockV3 {
	updateClock() {
		/*
			BAD PRACTICE :
				this.setState({"time": this.getTime()});
				this.setTimer
			GOOD PRACTICE : */
		this.setState({"time": this.getTime()}, this.setTimer);
	}
	setTimer(){
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.updateClock.bind(this), 1000);
	}
	componentDidMount() {
		this.setTimer();
	}
	componentWillUnmount(){
		clearTimeout(this.timeout);
	}
	render() {
 		return (
 			<ClockDisplay 
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm} 
	 		/>
	 	);
	}
}

/* V4.2 : PropTypes */

export const Bullshit = (props) => {
	return (<div></div>)
}

Bullshit.propTypes = {
	//basic types
	any: PropTypes.any,								// accept anything
	title: PropTypes.string,						// accept a string
	count: PropTypes.number,						// accept a number
	isOn: PropTypes.bool,							// accept a boolean (true or false)
	onDisplay: PropTypes.func,						// accept a function
	elem: PropTypes.object,							// accept {} {abc: "def", ghi: 123}
	node: PropTypes.node,							// accept anything that can be rendered : 10, "abc", <h1>test<h1>, <Clock />
	clockDisplay: PropTypes.instanceOf(ClockDisplay),	// accept an instance of ClockDisplay element
	counter: PropTypes.objectOf(PropTypes.number),	// accept an object of type "number"
	symbol: PropTypes.symbol,						// accept a symbol (décorator ?)
	// array
	arr: PropTypes.array,							// accept any array []
	users: PropTypes.arrayOf(PropTypes.object),		// accept an array of 'type', here an array of object [ {}, {something: "test"}, {} ]
	// accept among several
	alarmColor: PropTypes.oneOf(['red', 'blue']),	// accept one element among a list, here either 'red' or 'blue'
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(ClockV2)
	]),												// accept either a string or an instance of ClockV2
	contactList: PropTypes.shape({
		name: PropTypes.string,
		phone: PropTypes.string,
 	})												// accept an object that has theses elements with theses types

}


ClockDisplay.propTypes = {
	ampm: (props, propName, componentName) => // custom types : take your own function but has to return an Error instance if invalid
	{
		if (!props[propName]){
			return new Error(
				"propTypes Error : " + propName + ": No ampm property defined for component " + componentName
			);
		}
		if (typeof props[propName] !== "string") {
			return new Error(
				"propTypes Error : " + propName + ": ampm property is a type of '" + typeof props[propName] +  "' for component " + componentName + " instead of 'string'"
			);
		}
		if (props[propName] !== "am" && props[propName] !== "pm"){
			return new Error(
				"propTypes Error : " + propName + ": ampm property defined to '" + props[propName] +  "' for component " + componentName + " but should either be 'am' or 'pm'"
			);
		}
	},
	hours: PropTypes.number.isRequired,		// isRequired at the end marks it as required to work
	minutes: PropTypes.number.isRequired,
	seconds: PropTypes.number.isRequired
}

/* V4.3 : defaultProps */

ClockDisplay.defaultProps = {
	ampm: "pm"
}

Bullshit.defaultProps = {
	//basic types
	any: "lel",
	title: "title",
	count: 5,
	isOn: true,
	onDisplay: () => {return true},
	elem: {abc: "def", ghi: 123},
	node: <h1>test</h1>,
	clockDisplay: <Bullshit />,
	counter: 564,
	arr: [],
	users: [{}, {}, {}],
	alarmColor: 'blue',
	description: "anc",
	contactList: {
		name: "Rartur",
		phone: "0471741741",
	}
}

/* V5 style and className */
/* 
	all props must be camelCase,
	class is a reserved keyword in JS so we have to use className to put a css class in JSX
	style must be a JS object, so first "{" is to tell it's js, second is to tell its an object
	key inside this object must be camelCase
*/

// eslint-disable-next-line
const ClockDisplayV2 = (props) => {
	const {hours, minutes, seconds, ampm} = props;

	return (
		<div className="css_class_name" style={{ color: 'blue' }}>
			{
				hours === 0 ? 12 : (hours > 12) ? hours - 12 : hours
			}
			{ ":" }
			{
				minutes > 9 ? minutes : `0${minutes}` 
			}
			{ ":" }
			{
				seconds > 9 ? seconds : `0${seconds}` 
			}
			{ampm}
		</div>
	);
}

const ClockDisplayV3 = (props) => {
	const {hours, minutes, seconds, ampm} = props;
	const styleObj = { color: 'blue'};

	return (
		<div className="css_class_name" style={styleObj}>
			{
				hours === 0 ? 12 : (hours > 12) ? hours - 12 : hours
			}
			{ ":" }
			{
				minutes > 9 ? minutes : `0${minutes}` 
			}
			{ ":" }
			{
				seconds > 9 ? seconds : `0${seconds}` 
			}
			{ampm}
		</div>
	);
}

class ClockV5 extends ClockV4 {
	render() {
 		return (
 			<ClockDisplayV3
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm} 
	 		/>
	 	);
	}
}

/* V5.1 : Semantic Ui */

const ClockDisplaySemanticUi = (props) => {
	const {hours, minutes, seconds, ampm} = props;

	return (
		<Segment>
			{
				hours === 0 ? 12 : (hours > 12) ? hours - 12 : hours
			}
			{ ":" }
			{
				minutes > 9 ? minutes : `0${minutes}` 
			}
			{ ":" }
			{
				seconds > 9 ? seconds : `0${seconds}` 
			}
			{ampm}
		</Segment>
	);
}

class ClockV5V1 extends ClockV4 {
	render() {
 		return (
 			<ClockDisplaySemanticUi
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm} 
	 		/>
	 	);
	}
}


/* V6 : interactivity */
/* 
	https://reactjs.org/docs/events.html and https://reactjs.org/docs/handling-events.html
	on[Event] in camelCase 
*/

const ClockDisplayInteractive = (props) => {
	return (
		<div>
			<ClockDisplay {...props} />
			<button onClick={(event) => {
					console.log("you clicked"/*event*/);
					alert("you clicked"/*event*/)
				}}>
				test click
			</button>
 		</div>
 	);
}

class ClockV6 extends ClockV4 {
	render() {
 		return (
 			<ClockDisplayInteractive
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm} 
	 		/>
	 	);
	}
}

/* 
	best practice is to have a function handle[EventName] for each on[EventName]

	bind is used because "this" in js doesn't work like in java or c++. This in js depend on context and not on object creation.
	So if we were to use this 
*/

class ClockDisplayInteractiveV1  extends React.Component {
	handleClick(event) {
		console.log("you clicked"/*event*/);
		alert("you clicked"/*event*/)
	}
	render() {
		return (
			<div>
				<ClockDisplay {...this.props} />
				<button onClick={this.handleClick.bind(this)}>
					test click
				</button>
			</div>
		);
	}
}

class ClockV6V1 extends ClockV4 {
	render() {
 		return (
 			<ClockDisplayInteractiveV1
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm} 
	 		/>
	 	);
	}
}

/* passing function from parent to child component */

class ClockDisplayInteractiveV2  extends React.Component {
	handleClick(event) {
		this.props.freeze();
	}
	render() {
		return (
			<div>
				<ClockDisplay {...this.props} />
				<button onClick={this.handleClick.bind(this)}>
					freeze
				</button>
			</div>
		);
	}
}

class ClockV6V2 extends ClockV4 {
	handleFreeze(){
		clearTimeout(this.timeout);
	}
	render() {
 		return (
 			<ClockDisplayInteractiveV2
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm}
		 		freeze={this.handleFreeze.bind(this)}
	 		/>
	 	);
	}
}


/* */
class ClockDisplayInteractiveV3  extends React.Component {
	handleClick(event) {
		this.props.switchFreeze(!this.props.freezed);
	}
	render() {
		return (
			<div>
				<ClockDisplay {...this.props} />
				<button onClick={this.handleClick.bind(this)}>
					{this.props.freezed ? "run" : "freeze" }
				</button>
			</div>
		);
	}
}

class ClockV6V3 extends ClockV4 {
	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			freezed: false
		}
	}
	handleFreeze(freezing){
		if (freezing) {
			clearTimeout(this.timeout);
		}
		else {
			this.setState({"time": this.getTime()}, this.setTimer);
		}
		this.setState({freezed: freezing});
	}
	render() {
 		return (
 			<ClockDisplayInteractiveV3
		 		freezed={this.state.freezed}
	 			hours={this.state.time.hours} 
		 		minutes={this.state.time.minutes} 
		 		seconds={this.state.time.seconds} 
		 		ampm={this.state.time.ampm}
		 		switchFreeze={this.handleFreeze.bind(this)}
	 		/>
	 	);
	}
}

/* misc */

export const Clock = ClockV6V3;

const Title = (props) => {
	return <h2>{props.value}</h2>
}

export const AllClocks = () => {
	return (
		<div>
			<div>
				<Title value="Clock v0: " />
				<ClockV0 />
			</div>
			<div>
				<Title value="Clock v1: " />
				<ClockV1 />
			</div>
			<div>
				<Title value="Clock v2: " />
				<ClockV2 />
			</div>
			<div>
				<Title value="Clock v3: " />
				<ClockV3 />
			</div>
			<div>
				<Title value="Clock v4: " />
				<ClockV4 />
			</div>
			<div>
				<Title value="Clock v5: " />
				<ClockV5 />
			</div>
			<Container text textAlign="center">
				<Title value="Clock v5.1: " />
				<ClockV5V1 />
			</Container>
			<div>
				<Title value="Clock v6: " />
				<ClockV6 />
			</div>
			<div>
				<Title value="Clock v6.1 : " />
				<ClockV6V1 />
			</div>
			<div>
				<Title value="Clock v6.2 : " />
				<ClockV6V2 />
			</div>
			<div>
				<Title value="Clock v6.3 : " />
				<ClockV6V3 />
			</div>
		</div>
	);
}