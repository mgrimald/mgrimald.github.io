
import React from 'react';

import { PadRow, PadGrid } from './Pad.js';
import { PadSignAddCell, PadSignDivideCell, PadSignMultiplyCell, PadSignSubstractCell, PadSignEqualCell, PadSignModuloCell, PadNumberCell} from './Pad.js'
import { ExternalFrame, Result, ResultError} from './CalculatorDisplay.js'

function transformToResult(v, minSize=7){
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

export class VeryBasicCalculatorApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {error: false}
	}
	render (){
		return (
			<ExternalFrame>
				{
					this.state.error ? <ResultError /> : <Result result={transformToResult("1")} />
				}
				<PadGrid columns={4}>
					<PadRow>
						<PadNumberCell value={1} />
						<PadNumberCell value={2} />
						<PadNumberCell value={3} />
						<PadSignAddCell/>
					</PadRow>
					<PadRow>
						<PadNumberCell value={4} />
						<PadNumberCell value={5} />
						<PadNumberCell value={6} />
						<PadSignSubstractCell  />
					</PadRow>
					<PadRow>
						<PadNumberCell value={7} />
						<PadNumberCell value={8} />
						<PadNumberCell value={9} />
						<PadSignMultiplyCell value="x" />
					</PadRow>
					<PadRow>
						<PadSignModuloCell />
						<PadNumberCell value={0} />
						<PadSignEqualCell />
						<PadSignDivideCell />
					</PadRow>
				</PadGrid>
			</ExternalFrame>
		);
	}
}

export const CalculatorApp = VeryBasicCalculatorApp;