import React from 'react';
import PropTypes from 'prop-types'
import { Button, List as ListSUI, Segment, Container, Label, Step, Table, Form } from 'semantic-ui-react'


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
		// console.log("constructor");
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
		if (this.state.isLoaded){
			this.setState({
				error: null,
				isLoaded: false
			});
		}
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
	equalStringArray(first, second) {
		if (first !== second){
			if (first && !second) {
				if (first.length === 0)
					return true;
				return false;
			}
			if (!first && second) {
				if (second === 0)
					return true;
				return false;
			}
			if (first.length !== second.length)
				return false
			for (let i = 0; i < first.length; i++){
				if (first[i] !== second[i])
					return false
			}
		}
		return true;
	}
	equalProps(currentProps, nextProps){
		if (currentProps.urlRoot !== nextProps.urlRoot)
			return false

		if equalStringArray(currentProps.urls, nextProps.urls) && equalStringArray(currentProps.params, nextProps.params){
			return (true)
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log("shouldComponentUpdate")

		if (this.props.urlRoot 	!== nextProps.urlRoot /*||
			this.props.urls 	!== nextProps.urls ||
			this.props.params 	!== nextProps.params*/){
			this.fetchData(nextProps.urlRoot, nextProps.urls, nextProps.params);
			return true
		}
		if (nextState.isLoaded !== this.state.isLoaded)
			return true;
		/*if ((nextProps.symbol || this.props.symbol) && this.props.symbol === nextProps.symbol){
			return false;
		}*/
		return (true);
	}
	componentWillUpdate(nextProps, nextState) {
		//	console.log("nextProps", nextProps)
		//	console.log("this.props", this.props)
		//	console.log("componentWillUpdate")
	}
	componentDidUpdate(prevProps, prevState) {
		// console.log("componentDidUpdate")
		// if (!prevState.isLoaded && this.state.isLoaded /*&& ( prevProps.symbol !== this.props.symbol || (!this.props.symbol))*/){
			//console.log("prevProps", prevProps)
			//console.log("this.props", this.props)
			//console.log("V");
		// }
//		if ((prevProps.symbol || this.props.symbol) && prevProps.symbol === this.props.symbol){
//			console.log("r");

		//	this.fetchData(prevProps.urlRoot, prevProps.urls, prevProps.params);
//		}

	}

	componentWillUnmount() {
		// console.log("componentWillUnmount")
		/* TODO : handle situation where a call has been made */		
	}
	componentDidMount() {
		// console.log("didMount")
		const { urlRoot, urls, params } = this.props

		this.fetchData(urlRoot, urls, params);
	}

	render() {
		// console.log("render");
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
				console.log("api caller")
				return (this.props.success(result));
			}
			return (
				<DefaultApiCallerEntrypoint result={result} maxDepth={6} currentDepth={0} urlRoot={this.props.urlRoot} urls={this.props.urls}/>
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
						urls={this.props.href.split('/').filter((i) => i)}
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
		return (<DefaultApiCallerText text={props.result.toString()} urlRoot={props.urlRoot}></DefaultApiCallerText>);
	}
}

/*				let href=urlRoot;
				for (let i = 0; i < urls.length; i++) {
					href += '/' + urls[i]
					return (
							<Step key={i}>
								<Step.Content href={href} >
									<Step.Title>{urls[i]}</Step.Title>
								</Step.Content>
							</Step>
						);
				}*/
const DefaultApiCallerEntrypoint = (props) => {

	return (
		<Container fluid  >
		<Step.Group>
			<Step>
				<Step.Content href={props.urlRoot}>
					<Step.Title>{props.urlRoot}</Step.Title>
				</Step.Content>
			</Step>
			{
				props.urls.map(
					(url, i) => {
						return (
							<Step key={i}>
								<Step.Content href={props.urlRoot} >
									<Step.Title>{url}</Step.Title>
								</Step.Content>
							</Step>
						);
					}
				)
			}
		</Step.Group>
			<DefaultApiCallerDispatcher result={props.result} maxDepth={8} currentDepth={0} urlRoot={props.urlRoot} />
		</Container>
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
	return (
		<Table basic='very' celled collapsing>
			<Table.Body>
			{
				props.results.map(
					(item, i) => {
						return (
							<Table.Row key={/*item.toString() + '_'*/ + i} >
								<Table.Cell>
									<Label pointing='right'>{i}</Label>
								</Table.Cell>
								<Table.Cell>
									<DefaultApiCallerDispatcher
										result={item} 
										maxDepth={props.maxDepth} 
										currentDepth={props.currentDepth + 1} 
										urlRoot={props.urlRoot}
									/>
								</Table.Cell>
							</Table.Row>
						);
					}
				)
			}
			</Table.Body>
		</Table>
	);
}

const DefaultApiCallerObject = (props) => {
	return (
		<Segment>
			<Label pointing='right'>{props.result.key}</Label>
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
	const List = ListSUI;
	const ListItem = List.Item;

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

export class testClassWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			urlRoot: "https://swapi.co/api/",
			urls: ["films"],
			params: [],
			symbol: Symbol()
		}
	}
	render () {
		let formUrls = [];
		for (let i = 0; this.state.urls.length > i; i++){
			formUrls.push({
				key: i,
				url: this.state.urls[i],
				fctOnChange: (event) => {
					let tmp = this.state.urls;
					//console.log(event.target.value);
					tmp[i] = event.target.value;
					this.setState({urls: tmp});
				}
			}) 
		}
		return (
			<div>
				<Segment>
					<Form onSubmit={(event) => {
						this.setState({symbol: Symbol(this.urlRoot)})
					}}
					>
						<Form.Field>
							<label>Url root of the API</label>
							<input 
								value={this.state.urlRoot}
								placeholder='https://swapi.co/api/'
								onChange={
									(event) => {
										this.setState({urlRoot:event.target.value});
									}
								}
							/>
						</Form.Field>
						{formUrls.map((elem) => {
							return (
								<Form.Field key={elem.key}>
									<label>url path</label>
									<input
										value={elem.url}
										placeholder=''
										onChange={elem.fctOnChange}
									/>
								</Form.Field>
							)
						})}
						<Form.Field key={-1}>
							<label>add to url:</label>
							<input
								placeholder='new url extension'
								onChange={
									(event) => {
										let tmp = this.state.urls;
										tmp.push(event.target.value);
										event.target.value = ""
										this.setState({urls:tmp});
									}
								}
							/>
						</Form.Field>
						<Button type='submit'>Submit</Button>
					</Form>
				</Segment>
			<ApiCaller 
				urlRoot={this.state.urlRoot} 
				urls={this.state.urls}
				//symbol={this.state.symbol}
			/>
			</div>
		);
	}
}
