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
				<DefaultApiCallerEntrypoint result={result} maxDepth={8} currentDepth={0} urlRoot={this.props.urlRoot}/>
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
	const urls = ["films"];
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
				<a onClick={(e) => {this.setState({isClicked: true})}}>
					{this.props.text}
				</a>
			)
		} else {
			return (
				// <div>
				// 	<a onClick={(e) => {this.setState({isClicked: false})}}>
				// 		hidde
				// 	</a>
					<ApiCaller 
						urlRoot={this.props.urlRoot} 
						urls={[this.props.href]}
					/>
				// </div>
			);
		}
	}
}

const DefaultApiCallerDispatcher = (props) => {
	if (props.currentDepth > props.maxDepth)
		return <DefaultApiCallerText isMaxDepth />;
	if (props.result === null) {
		return <DefaultApiCallerText isNull />;
	}
	if (!!props.result && props.result.constructor === Array){
		return (
			<DefaultApiCallerList 
				results={props.result} ordered
				urlRoot={props.urlRoot}
				maxDepth={props.maxDepth}
				currentDepth={props.currentDepth} />
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
		return (
			<DefaultApiCallerListObject
				results={ret}
				urlRoot={props.urlRoot}
				maxDepth={props.maxDepth}
				currentDepth={props.currentDepth}
			/>
		);
	}
	else {
		return (<DefaultApiCallerText text={props.result} urlRoot={props.urlRoot}></DefaultApiCallerText>);
	}
}

const DefaultApiCallerEntrypoint = (props) => {
	return (
		<DefaultApiCallerDispatcher result={props.result} maxDepth={8} currentDepth={0} urlRoot={props.urlRoot} />
	);
}

const DefaultApiCallerText = ({text, urlRoot, isMaxDepth, isNull}) => {
	if (isMaxDepth){
		return <DefaultApiCallerText text="Sorry, we are at max" />;
	}
	if (text === null || isNull){
		return <DefaultApiCallerText text="(null)" />;
	} else if (text === undefined){
		return <DefaultApiCallerText text='(undefined)' />;
	}
	const t = text.toString();
	if (urlRoot && t.indexOf(urlRoot) === 0) {
		const href = t.slice(urlRoot.length)
		return (
			<DefaultApiCallerRecursive text={text} urlRoot={urlRoot} href={href} />
		)
		//return <a href={text}>{text}</a>;
	}
	return <span>{text}</span>;
}

const DefaultApiCallerList = (props) => {
	//const List = "ol";
	//const ListItem = "li";
	const List = List;
	const ListItem = List.Item;

	return (
		<List ordered>
			{
				props.results.map(
					(item, i) => {
						return (
							<ListItem key={/*item.toString() + '_'*/ + i }>
								<DefaultApiCallerDispatcher
									result={item} 
									maxDepth={props.maxDepth} 
									currentDepth={props.currentDepth + 1} 
									urlRoot={props.urlRoot}
								/>
							</ListItem>
						);
					}
				)
			}
		</List>
	);
}

const DefaultApiCallerObject = (props) => {
	return (
		<Segment>
			{props.result.key}:
			<DefaultApiCallerDispatcher 
				result={props.result.value} 
				maxDepth={props.maxDepth} 
				currentDepth={props.currentDepth + 1} 
				urlRoot={props.urlRoot}
			/>
		</Segment>
	);
}

const DefaultApiCallerListObject = (props) => {
	const List = "ul";
	const ListItem = "li";

	if (props.results.length === 0){
		return <DefaultApiCallerText text="(empty)" />
	}
	return (
		<List>
			{
				props.results.map(
					(item, i) => {
						return (
							<ListItem key={item.key}>
								<DefaultApiCallerObject 
									result={item} 
									maxDepth={props.maxDepth} 
									currentDepth={props.currentDepth} 
									urlRoot={props.urlRoot}
								/>
							</ListItem>
						);
					}
				)
			}
		</List>
	);
}