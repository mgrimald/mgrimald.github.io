import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

export const Header = (props) => {
	return (
		<Menu header widths={4}>
            <Menu.Item as={NavLink} exact to="/semantic" name="Home" />
            <Menu.Item as={NavLink} exact to="/semantic/todoApp" name="todoApps" />
            <Menu.Item as={NavLink} exact to="/semantic/todoApp/trashBin/" name="trashBin" />
            <Menu.Item as={NavLink} exact to="/semantic/FAIL" name="FAIL" />
    	</Menu>
	);
};