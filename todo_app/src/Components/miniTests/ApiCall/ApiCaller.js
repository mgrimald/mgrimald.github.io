import React from 'react';

export class ApiCaller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			result: {}
		};
	}

	componentDidMount() {
		fetch("https://swapi.co/api/people/")
		.then(
			(res) => {
				console.log(res);
				return (res.json());
			}
		)
		.then(
			(result) => {
				console.log(result);
				this.setState({
					isLoaded: true,
					error: false,
					result: result
				});
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log()
				this.setState({
					isLoaded: true,
					error: error
				});
			}
		)
	}

	render() {
		const { error, isLoaded, result } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ul>
					{
						result.results.map(
							(item) => (
								<li key={item.name}>
									{item.name} {item.price}
								</li>
							)
						)
					}
				</ul>
			);
		}
	}
}