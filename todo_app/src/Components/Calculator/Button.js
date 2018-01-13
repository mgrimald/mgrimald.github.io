
import React from 'react';
import { Button, Grid, Container } from 'semantic-ui-react'

export const BoardCell = (props) => {
	const divStyle = {position: "absolute", paddingBottom: "43%", paddingTop: "43%", 
						textAlign: "center", fontSize: "5em",
						top: 0, bottom: 0, left: 0, right: 0
					};
	const btnStyle = {paddingBottom: "50%", paddingTop: "50%", position: "relative"}

	return (
		<Grid.Column >
			<Button fluid circular={props.circular} style={btnStyle}>
				<div style={divStyle}>{props.value}</div>
			</Button>
		</Grid.Column>
	);
}

export const BoardSignCell = (props) => {
	return (<BoardCell  {...props} />
	);
}

export const BoardNumberCell = (props) => {
	return (<BoardCell circular={true} {...props} />
	);
}

export const BoardRow = (props) => {
	return (
		<Grid.Row>
			{props.children}
		</Grid.Row>
	);
}

export const BoardGrid = (props) => {
	return (
		<Container text>
			<Grid padded columns={4} >
				{props.children}
			</Grid>
		</Container>
	);
}