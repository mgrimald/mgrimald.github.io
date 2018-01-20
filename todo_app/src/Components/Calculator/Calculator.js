
import React from 'react';

import { PadRow, PadGrid } from './Pad.js';
import { PadSignAddCell, PadSignDivideCell, PadSignMultiplyCell, PadSignSubstractCell, PadSignEqualCell, PadSignModuloCell, PadNumberCell} from './Pad.js'
import { ExternalFrame, Result, ResultError} from './CalculatorDisplay.js'

function transformToResult(v, c, minSize=5){
	const cLength = c.split('').length;
	if (cLength > minSize) {
		minSize = cLength;
	}
	const value = v.split('');
	if (value.length >= minSize){
		return value;
	}
	const arr = [];
	for (let i = 0; i < minSize; i++) {
		arr[i] = "0";
	}
	for (let i = 0; i < value.length; i++) { 
		arr[arr.length - value.length + i] = value[i];
	}
	return arr;
}

function appendNumber(original, app) {
	return original * 10 + app;
}

export class VeryBasicCalculatorApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			error: false,
			resultN: 0,
			resultS: "0",
			valueN: 0,
			valueS: "0",
			action: ''
		}
		//this.handleSign.bind(this);
		//this.handleChiffre.bind(this);
	}
	handleSign(action){

		if (action === '%' || this.state.error){//temporaire
			if (this.state.error && action === '%'){
				this.setState({
					error: false,
					resultN: 0,
					resultS: "0",
					valueN: 0,
					valueS: "0",
					action: ''}
				);
				return ;
			}
			else if (this.state.valueS === "0"){
				this.setState({resultN: 0, action: '', resultS: "0"});
			} else {
				this.setState({valueN: 0, action: '', valueS: "0"});
			}
		}
		else if (action === this.state.action){
			if (this.state.valueS === "0"){
				this.setState({valueN: 0, action: '', valueS: "0"});
			} else {
				this.setState()
			}
		}
		else if (action === "="){
			if (this.state.action === '+'){
				const r = this.state.resultN + this.state.valueN;
				const rS = r.toString();

				if (rS.length > 10){
					this.setState({error:true});
				} else {
					this.setState({
						resultN: r,
						resultS: rS,
						valueN: 0,
						valueS: "0",
						action: ''}
					);
				}
			} else if (this.state.action === '-'){
				const r = this.state.resultN - this.state.valueN;
				const rS = r.toString();

				if (rS.length > 10){
					this.setState({error:true});
				} else {
					this.setState({
						resultN: r,
						resultS: rS,
						valueN: 0,
						valueS: "0",
						action: ''}
					);
				}
			} else if (this.state.action === '/'){
				const r = this.state.resultN / this.state.valueN;
				const rS = r.toString();

				if (rS.length > 10){
					this.setState({error:true});
				} else {
					this.setState({
						resultN: r,
						resultS: rS,
						valueN: 0,
						valueS: "0",
						action: ''}
					);
				}
			} else if (this.state.action === 'X'){
				const r = this.state.resultN * this.state.valueN;
				const rS = r.toString();

				if (rS.length > 10){
					this.setState({error:true});
				} else {
					this.setState({
						resultN: r,
						resultS: rS,
						valueN: 0,
						valueS: "0",
						action: ''}
					);
				}
			}
		} else if (action === "+"||action === "X"||action === "-"||action === "/"||action === "%") {
			this.setState({action: action});
		}
	}
	handleChiffre(chiffre){
		const original = this.state.action === '' ? this.state.resultN : this.state.valueN;
		const n =  appendNumber(original, chiffre);
		const s = n.toString();
		if (s.length > 10){
			this.setState({error: true}, () => {console.log("sorry, this is not meant for that usage ... yet")});
		}
		else {
			this.setState(this.state.action === '' ? {resultN: n, resultS: s} : {valueN: n, valueS: s});
		}
	}
	render () {
		return (
			<ExternalFrame>
				{
					this.state.error 
					? <ResultError />
					: (
						<Result 
							result={transformToResult(this.state.resultS, this.state.valueS)}
							value={transformToResult(this.state.valueS, this.state.resultS)} 
							action={this.state.action}
						/>
					)
				}
				<PadGrid columns={4}>
					<PadRow>
						<PadNumberCell		value={1}		handleClick={this.handleChiffre.bind(this, 1)} />
						<PadNumberCell		value={2}		handleClick={this.handleChiffre.bind(this, 2)} />
						<PadNumberCell		value={3}		handleClick={this.handleChiffre.bind(this, 3)} />
						<PadSignAddCell
							isActive={this.state.action === "+"}
							handleClick={this.handleSign.bind(this, '+')}
						/>
					</PadRow>
					<PadRow>
						<PadNumberCell		value={4}		handleClick={this.handleChiffre.bind(this, 4)} />
						<PadNumberCell		value={5}		handleClick={this.handleChiffre.bind(this, 5)} />
						<PadNumberCell		value={6}		handleClick={this.handleChiffre.bind(this, 6)} />
						<PadSignSubstractCell
							isActive={this.state.action === "-"}
							handleClick={this.handleSign.bind(this, '-')}
						/>
					</PadRow>
					<PadRow>
						<PadNumberCell		value={7}		handleClick={this.handleChiffre.bind(this, 7)} />
						<PadNumberCell		value={8}		handleClick={this.handleChiffre.bind(this, 8)} />
						<PadNumberCell		value={9}		handleClick={this.handleChiffre.bind(this, 9)} />
						<PadSignMultiplyCell
							isActive={this.state.action === "X"}
							handleClick={this.handleSign.bind(this, 'X')}
						/>
					</PadRow>
					<PadRow>
						<PadSignModuloCell
							isActive={this.state.action === "%"}
							handleClick={this.handleSign.bind(this, '%')}
						/>
						<PadNumberCell		value={0}		handleClick={this.handleChiffre.bind(this, 0)} />
						<PadSignEqualCell
							isActive={this.state.action === "="}
							handleClick={this.handleSign.bind(this, '=')}
						/>
						<PadSignDivideCell
							isActive={this.state.action === "/"}
							handleClick={this.handleSign.bind(this, '/')}
						/>
					</PadRow>
				</PadGrid>
			</ExternalFrame>
		);
	}
}

export const CalculatorApp = VeryBasicCalculatorApp;