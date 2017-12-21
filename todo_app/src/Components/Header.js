import React from 'react';
import { NavLink } from 'react-router-dom';
export const Header = (props) => {
	return (
		<div>
	      <ul>
    	    <li><NavLink exact activeClassName="testActive" to="/">Home (redirect to -> )</NavLink></li>
        	<li><NavLink exact activeClassName="testActive" to="/todoApp">todoApps</NavLink></li>
        	<li><NavLink exact activeClassName="testActive" to="/todoApp/trashBin/">trashBin</NavLink></li>
    	    <li><NavLink exact activeClassName="testActive" to="/FAIL">FAIL</NavLink></li>
    	  </ul>
	      <hr className="brace" />
		</div>
	);
};