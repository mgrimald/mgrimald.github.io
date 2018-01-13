
import React from 'react';

import { BoardNumberCell, BoardSignCell, BoardRow, BoardGrid } from './Button.js';

export const Board = () => {
	return (
		<BoardGrid>
			<BoardRow>
				<BoardNumberCell value={1} />
				<BoardNumberCell value={2} />
				<BoardNumberCell value={3} />
				<BoardSignCell value="+" />
			</BoardRow>
			<BoardRow>
				<BoardNumberCell value={4} />
				<BoardNumberCell value={5} />
				<BoardNumberCell value={6} />
				<BoardSignCell value="-" />
			</BoardRow>
			<BoardRow>
				<BoardNumberCell value={7} />
				<BoardNumberCell value={8} />
				<BoardNumberCell value={9} />
				<BoardSignCell value="x" />
			</BoardRow>
			<BoardRow>
				<BoardSignCell value="*" />
				<BoardNumberCell value={0} />
				<BoardSignCell value="=" />
				<BoardSignCell value="/" />
			</BoardRow>
		</BoardGrid>
	);
}
