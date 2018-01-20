
import React from 'react';
import PropTypes from 'prop-types'
import { Button, Grid, /*Container, Icon*/ } from 'semantic-ui-react'

function c(text, length) {
	/*const svgStyle = {position: "absolute",	top: 0, bottom: 0, left: 0, right: 0};
	const iconStyle = {position: "absolute", top: 0, bottom: 0, left: 0, right: 0};*/
	/*const divStyle = {
		position: "absolute", 
		paddingBottom: "43%", paddingTop: "43%", 
		textAlign: "center", fontSize: "5vw",
		maxWidth: "135px",
		top: 0, bottom: 0, left: 0, right: 0,
	};
	const divStyle1 = {...divStyle, fontSize: "12vw"};
	const divStyle2 = {...divStyle, fontSize: "10vw"};
	const divStyle4 = {...divStyle, fontSize: "7vw"}*/
	if (length === 1){
		return <div className="calculatorPadCell calculatorPadCell1"/*style={divStyle1}*/>{text}</div>;
	} else if (length === 2){
		return <div className="calculatorPadCell calculatorPadCell2"/*style={divStyle2}*/>{text}</div>;
	} else if (length === 3){
		return <div className="calculatorPadCell calculatorPadCell3"/*style={divStyle2}*/>{text}</div>;
	} else if (length === 4){
		return <div className="calculatorPadCell calculatorPadCell4"/*style={divStyle4}*/>{text}</div>;
	}
}

export const PadCell = (props) => {
	const btnStyle = {padding: "50%", position: "relative"/*, width: "15vw"*/}

	const text = props.value.toString()
	const div = c(text, text.length);
	return (
		<Grid.Column >
			<Button fluid circular={props.circular} style={btnStyle}>
				{div}
				{/*<div style={divStyle}>{props.value}</div>*/}
			</Button>
		</Grid.Column>
	);
}

export const PadSignCell = (props) => {
	return (<PadCell  {...props} />);
}
export const PadSignAddCell = (props) => {
	return (<PadSignCell  {...props} value="+" />);
}
export const PadSignDivideCell = (props) => {
	return (<PadSignCell  {...props} value="/" />);
}
export const PadSignMultiplyCell = (props) => {
	return (<PadSignCell  {...props} value="x" />);
}
export const PadSignSubstractCell = (props) => {
	return (<PadSignCell  {...props} value="-" />);
}
export const PadSignEqualCell = (props) => {
	return (<PadSignCell  {...props} value="=" />);
}
export const PadSignModuloCell = (props) => {
	return (<PadSignCell  {...props} value="%" />);
}
export const PadNumberCell = (props) => {
	return (<PadCell circular={true} {...props} />);
}



/* 											*/


export const PadRow = (props) => {
	return (
		<Grid.Row>
			{props.children}
		</Grid.Row>
	);
}

export const PadGrid = (props) => {
	return (
		<Grid inverted color={"grey"} padded columns={props.columns} >
			{props.children}
		</Grid>
	);
}
PadGrid.propTypes = {
	children: PropTypes.any,
	columns: PropTypes.number.isRequired
}