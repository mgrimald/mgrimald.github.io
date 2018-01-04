import React from 'react';
import { NavLink } from 'react-router-dom';
export const Header = (props) => {
	return (
		<div>
	      <ul>
    	    <li><NavLink exact activeClassName="testActive" to="/basic">Home (redirect to -> )</NavLink></li>
        	<li><NavLink exact activeClassName="testActive" to="/basic/todoApp">todoApps</NavLink></li>
        	<li><NavLink exact activeClassName="testActive" to="/basic/todoApp/trashBin/">trashBin</NavLink></li>
    	    <li><NavLink exact activeClassName="testActive" to="/basic/FAIL">FAIL</NavLink></li>
    	  </ul>
    	</div>
	);
};