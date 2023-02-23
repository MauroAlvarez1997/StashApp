import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './SideNavBarPage.css';

function SideNavBarPage({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='sideNavBar'>
      This is the side NavBar
		</div>
	);
}

export default SideNavBarPage;
