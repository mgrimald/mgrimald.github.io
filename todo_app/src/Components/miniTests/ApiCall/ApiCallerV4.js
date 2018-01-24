import React from 'react';
import PropTypes from 'prop-types'


const finishWithSlash = (base) => {
	return base.charAt(base.length-1) === '/'
		? base
		: base + '/'
}
const dontStartWithSlash = (str) => {
	return str.charAt(0) === '/'
		? str.slice(1)
		: str
}

export class ApiCaller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			result: {}
		};
	}
	fetchData(urlRoot, urls, params){
		let apiCall = finishWithSlash(urlRoot);
		urls.forEach((url) => {
			apiCall += dontStartWithSlash(finishWithSlash(url));
		});
		/*  V   To refactor V                */
		if (params && params.length > 0) {
			let i = 0;
			if (params[i].string) {
				apiCall = apiCall + "?" + params[i].string;
			} else {
				apiCall = apiCall + "?" + params[i].name + "=" + params[i].value;
			}
			for (i = 1; i < params.length; i++) {
				if (params[i].string) {
					apiCall = apiCall + "&" + params[i].string;
				} else {
					apiCall = apiCall + "&" + params[i].name + "=" + params[i].value;
				}
			}
		}
		/*    ^      to refactor           ^     */
		fetch(apiCall)
		.then(
			(res) => {
				return (res.json());
			}
		)
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					error: false,
					result: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error: error
				});
			}
		)
	}

	componentWillUnmount() {
		/* TODO : handle situation where a call has been made */		
	}
	componentDidMount() {
		const { urlRoot, urls, params } = this.props

		this.fetchData(urlRoot, urls, params);
	}
	render() {
		const { error, isLoaded, result } = this.state;

		if (error) {
			if (this.props.error){
				return this.props.error(error);
			}
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			if (this.props.loader) {
				return this.props.loader();
			}
			return <div>...loading</div>
		} else {
			if (this.props.success){
				return (this.props.success(result));
			}
			return (
				<DefaultApiCallerResult result={result} maxDepth={8} currentDepth={0} urlRoot={this.props.urlRoot}/>
			);
		}
	}
}
ApiCaller.propTypes = {
	urlRoot:	PropTypes.string.isRequired,

	urls:		PropTypes.arrayOf(PropTypes.string),

	params:		PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				name:		PropTypes.string.isRequired,
				value:		PropTypes.any
			}),
			PropTypes.shape({
				string:		PropTypes.string.isRequired
			})
		])
	),

	success:	PropTypes.func,
	error:		PropTypes.func,
	loader:		PropTypes.func
}


export const testClassWrapper = (props) => {
	const urlRoot = "https://swapi.co/api/";
	const urls = ["films", "2"];
	return (
		<ApiCaller 
			urlRoot={urlRoot} 
			urls={urls}
		/>
	);
}

export class DefaultApiCallerRecursive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false
		};
	}
	render() {
		if (this.state.isClicked === false) {
			return (
				<button onClick={(e) => {this.setState({isClicked: true})}}>
					show : {this.props.text}
				</button>
			)
		} else {
			return (
				<div>
					<button onClick={(e) => {this.setState({isClicked: false})}}>
						hidde
					</button>
					<ApiCaller 
						urlRoot={this.props.urlRoot} 
						urls={[this.props.href]}
					/>
				</div>
			);
		}
	}
}

const DefaultApiCallerText = ({text, urlRoot}) => {
	if (text === null){
		return "(null)";
	} else if (text === undefined){
		return '(undefined)';
	}
	const t = text.toString();
	if (t.indexOf(urlRoot) === 0) {
		const href = t.slice(urlRoot.length)
		return (
			<DefaultApiCallerRecursive text={text} urlRoot={urlRoot} href={href} />
		)
		//return <a href={text}>{text}</a>;
	}
	return text;
}

const DefaultApiCallerResult = (props) => {
	if (props.currentDepth > props.maxDepth)
		return <DefaultApiCallerText>sorry, this is the max depth</DefaultApiCallerText>;
	if (props.result === null) {
		return <DefaultApiCallerText>(NULL)</DefaultApiCallerText>;
	}
	if (!!props.result && props.result.constructor === Array){
		// console.log("arr:", props.result);
		if (props.result.length === 0){
			return <DefaultApiCallerText>empty</DefaultApiCallerText>
		}
		return (
			<ol>
			{
				props.result.map(
					(item, i) => {
						return (
							<li key={item.toString() + '_' + i}>
								<DefaultApiCallerResult result={item} maxDepth={props.maxDepth} currentDepth={props.currentDepth + 1} urlRoot={props.urlRoot}/>
							</li>
						);
					}
				)
			}
			</ol>
		);
	}
	let ret = [];
	if (!(typeof props.result === 'string' || props.result instanceof String)){
		for (let key in props.result) {
			if (props.result.hasOwnProperty(key)) {
				ret.push({key: key, value: props.result[key]});
			}
		}
	}
	if (ret.length !== 0){
		// console.log("ret:", ret);
		return (
			<ul>
			{
				ret.map(
					(item) => {
						//console.log("item:", item);
						return (
							<li key={item.key}>
								{item.key}: 
								<DefaultApiCallerResult result={item.value} maxDepth={props.maxDepth} currentDepth={props.currentDepth + 1} urlRoot={props.urlRoot}/>
								
							</li>
						);
					}
				)
			}
			</ul>
		);
	}
	else {
		// console.log("props.result:", props.result);
		return (<DefaultApiCallerText text={props.result} urlRoot={props.urlRoot}></DefaultApiCallerText>);
	}
}