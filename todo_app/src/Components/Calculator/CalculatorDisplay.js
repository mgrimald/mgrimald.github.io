
import React from 'react';
import PropTypes from 'prop-types'
import { Container, Segment, Grid, Divider } from 'semantic-ui-react'

export const ExternalFrame = (props) => {
	return (
		<Container text>
			<Segment secondary>
				{props.children}
			</Segment>
		</Container>
	);
}

export const Result = (props) => {
	const GridColumnStyle = {paddingLeft: "0.5rem", paddingRight: "0.5rem"};
	const res = props.result.map((val, ite) => {
		return (
			<Grid.Column key={"GamesCalculatorResult_"+ite} style={GridColumnStyle}>
				<Segment inverted color={props.error ? "black" : "yellow"}>
					<h2><strong>{val}</strong></h2>
				</Segment>
			</Grid.Column>
		)
	})
	if (!(!props.error && props.action && props.value)) {
		return (
			<Segment tertiary textAlign={"center"}>
				<Grid container columns={res.length}>
					<Grid.Row>
						{res}
					</Grid.Row>
				</Grid>
			</Segment>
		);
	}
	const val = props.value.map((val, ite) => {
		return (
			<Grid.Column key={"GamesCalculatorResult_"+ite} style={GridColumnStyle}>
				<Segment inverted color={props.error ? "black" : "yellow"}>
					<h2><strong>{val}</strong></h2>
				</Segment>
			</Grid.Column>
		)
	})
	return (
		<Segment tertiary textAlign={"center"}>
			<Grid container columns={res.length}>
				<Grid.Row>
					{res}
				</Grid.Row>
				<Divider horizontal fitted>
					<h2>{props.action}</h2>
				</Divider>
				<Grid.Row>
					{val}
				</Grid.Row>
			</Grid>
		</Segment>
	);
}
Result.propTypes = {
	result: PropTypes.array.isRequired,
	value: PropTypes.array,


}

export const ResultError = (props) => {
	const error = "ERROR!".split('');
	return (
		<Result result={error} error/>
	);
}