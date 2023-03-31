import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateTransactionModal from '../CreateTransactionModal';
import { thunkAllPaymentMethods } from "../../store/pymentmethods";
import './SideNavBarPage.css';
import { authenticate } from '../../store/session';

function SideNavBarPage(){
	const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const statePaymentMethodsObj = useSelector(state => state.paymentMethods);


  useEffect(() => {
		dispatch(thunkAllPaymentMethods()).then(dispatch(authenticate())).then(() => setLoaded(true));
	}, [dispatch]);

	return loaded && (
		<div className='sideNavBar'>
      <div className='topUserInfoSideNav'>
        <div className='SideNavIcon'>
        {/* <i className="fa-regular fa-circle-user fa-2xl"></i> */}
          <img className="profile-photo" src={sessionUser.profile_photo} ></img>
        </div>
        <div className='first-last-name-SideNav'>{sessionUser.firstname} {sessionUser.lastname}</div>
        <div className='username-SideNav'><i class="fa-solid fa-comment-dollar"></i> {sessionUser.username}</div>
      </div>
      <div className='bittomInfoSideNav'>
        <div className='sideNavBarClickLinkFunds'>
          ${sessionUser.funds}
        </div>
        <div className='sideNavBarClickLink'>
          <NavLink exact to="/activities">
            <i class="fa-regular fa-clock"></i> Activity
          </NavLink>
        </div>
        <div className='sideNavBarClickLink'>
          <NavLink exact to="/payment-methods">
          <i class="fa-regular fa-credit-card"></i> Methods
          </NavLink>
        </div>
        <div className='sideNavBarClickLink'>
          <NavLink exact to="/funds">
            <i class="fa-solid fa-sack-dollar"></i> Funds
          </NavLink>
        </div>
        <div className='sideNavBarClickLink'></div>
        <div className='sideNavBarClickLink'></div>
      </div>
        <OpenModalButton
                    buttonText="NEW"
                    modalComponent={<CreateTransactionModal />}
                  />
		</div>
	);
}

export default SideNavBarPage;
