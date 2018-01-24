import React from 'react';
import PropTypes from 'prop-types'

const Person = (props) => {
	return <p>{props.name}<br/>h:{props.height}<br/>bd:{props.birth_year}</p>
}
Person.propTypes = {
	name:		PropTypes.string.isRequired,
	height:		PropTypes.string,
	birth_year:	PropTypes.string,
}

const People = (props) => {
	return (
		<ul>
		{
			props.people.map(
				(person) => (
					<li key={person.name}>
						<Person {...person}/>
					</li>
				)
			)
		}
		</ul>
	)
}
People.propTypes = {
	people: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
		})
	).isRequired
}

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

	componentWillMount() {
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
				<People people={result.results}/>
			);
		}
	}
}
ApiCaller.propTypes = {
	urlRoot: PropTypes.string.isRequired,

	urls: PropTypes.arrayOf(PropTypes.string),

	params: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.any
			}),
			PropTypes.shape({
				string: PropTypes.string.isRequired
			})
		])
	),

	success:	PropTypes.func,
	error:		PropTypes.func,
	loader:		PropTypes.func
}

export class PeopleWrapper extends React.Component {
	render() {
		const urlRoot = "https://swapi.co/api/";
		const urls = ["people/"];
		return (
			<div>
				<ApiCaller 
					urlRoot={urlRoot} 
					urls={urls}
					success={
						(result) => {
							return <People people={result.results}/>;
						}
					}
					error={
						(error) => {
							return <div>Personnalized error: {error.message}</div>;
						}
					}
					loader={
						() => {
							return <div>Looooaaaaading...</div>;
						}
					}
				/>
			</div>
		);
	}
}