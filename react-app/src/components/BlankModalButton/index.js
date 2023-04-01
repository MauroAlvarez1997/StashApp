import React from 'react';
import { useModal } from '../../context/Modal';
import { useSelector } from "react-redux";
import { authenticate } from '../../store/session';

function BlankOpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose).then();
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };


    return (
      <div className="SideNavIcon" onClick={onClick}>
        <img className="profile-photo-edit" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="alternatetext"></img>
        <img id='b' className="profile-photo" src={sessionUser.profile_photo} ></img>
      </div>
    );
}

export default BlankOpenModalButton;
