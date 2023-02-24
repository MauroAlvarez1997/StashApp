import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateTransactionModal from '../UpdateTransactionModal';
import CreateTransactionModal from '../CreateTransactionModal';

import './SideNavBarPage.css';

function SideNavBarPage({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='sideNavBar'>
      <div className='topUserInfoSideNav'>
        <i class="fa-solid fa-circle-user fa-2xl"></i>
        <div className='first-last-name-SideNav'>{sessionUser.firstname} {sessionUser.lastname}</div>
        <div className='username-SideNav'><i class="fa-solid fa-comment-dollar"></i> {sessionUser.username}</div>
      </div>
      <div className='bittomInfoSideNav'>
        <div className='sideNavBarClickLink'>
          <NavLink exact to="/activities">
            <i class="fa-regular fa-clock"></i> Activity
          </NavLink>

        </div>
        <div className='sideNavBarClickLink'></div>
        <div className='sideNavBarClickLink'></div>
        <div className='sideNavBarClickLink'></div>
        <OpenModalButton
                    buttonText="Update"
                    // onItemClick={closeMenu}
                    modalComponent={<CreateTransactionModal  />}
                  />
      </div>
		</div>
	);
}

export default SideNavBarPage;
