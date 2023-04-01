import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateTransactionModal from '../CreateTransactionModal';
import { thunkAllPaymentMethods } from "../../store/pymentmethods";
import './SideNavBarPage.css';
import { authenticate } from '../../store/session';
import UpdateProfilePhotoModal from '../UpdateProfilePhotoModal/indes';
import { useModal } from '../../context/Modal';
import BlankOpenModalButton from '../BlankModalButton';

function SideNavBarPage(){
	const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const statePaymentMethodsObj = useSelector(state => state.paymentMethods);
  const { setModalContent, setOnModalClose } = useModal();

  useEffect(() => {
		dispatch(thunkAllPaymentMethods()).then(dispatch(authenticate())).then(() => setLoaded(true));
	}, [dispatch]);

	return loaded && (
		<div className='sideNavBar'>
      <div className='topUserInfoSideNav'>
        {/* <div id='a' className='SideNavIcon'>
        <i className="fa-regular fa-circle-user fa-2xl"></i>
          <img className="profile-photo-edit" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="alternatetext"></img>
          <img id='b' className="profile-photo" src={sessionUser.profile_photo} ></img>
        </div> */}
        <BlankOpenModalButton onButtonClick={authenticate()} modalComponent={<UpdateProfilePhotoModal />} />
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
