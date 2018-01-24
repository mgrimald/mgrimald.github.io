import React from 'react';

const Person = (props) => {
	return <p>{props.name}<br/>h:{props.height}<br/>bd:{props.birth_year}</p>
}
const List = (props) => {
	return (
		<ul>
		{
			props.results.map(
				(item) => (
					<li key={item.name}>
						<Person {...item}/>
					</li>
				)
			)
		}
		</ul>
	)
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
	fetchData(apiParam){
		const apiUrl = "https://swapi.co/api/";
		fetch(apiUrl + apiParam)
		.then(
			(res) => {
				console.log(res);
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

	componentDidMount() {
		this.fetchData();
	}
	render() {
		const { error, isLoaded, result } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<List results={result.results}/>
			);
		}
	}
}