import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	let navBarClassName;

	if(!sessionUser){
		navBarClassName = 'navBarGreen'
	} else {
		navBarClassName = 'navBar'
	}

	return (
		<div className={navBarClassName}>
			<div className='navContainerHome'>


				<div>
				{sessionUser ? (
						<NavLink className='homeLogoGreen' exact to="/activities"> <i class="fa-solid fa-comments-dollar"></i>  Stash App</NavLink>
					) : (
						<NavLink className='homeLogo' exact to="/"> <i class="fa-solid fa-comments-dollar"></i>  Stash App</NavLink>
					)}

				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
