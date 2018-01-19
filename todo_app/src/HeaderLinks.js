import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const join = (base, path) => {
	const b = base.charAt(base.length-1) === '/'
		? base
		: base + '/'
	return (path.charAt(path.length-1) === '/'
		? b + path.slice(0, -1)
		: b + path);
}

export const HeaderLinks = (props) => {
	const linksCondition = (props.links && props.links.length > 0)
	const menuLinks = linksCondition ? props.links.map(
		(link) => {
			return (
				<Menu.Item
					key={join(props.baseUrl, link.to)}
					as={NavLink}
					exact to={join(props.baseUrl, link.to)}
					name={link.name}
				/>
			);
		}
	) : null;
	const widths = linksCondition ? props.links.length : 0;
	return (
		<Menu /*header*/ inverted widths={widths + 1} stackable>
			<Menu.Item as={NavLink} exact to={"/"}  name="Home" />
			{menuLinks}
		</Menu>
	);
};


HeaderLinks.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			to: PropTypes.string.isRequired,
		})
	)
};
