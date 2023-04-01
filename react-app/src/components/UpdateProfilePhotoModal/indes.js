import React, { useState } from "react";
import { thunkUpdateProfilePhoto } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { authenticate } from '../../store/session'
import { thunkAllActivities } from "../../store/activities";
import { thunkAllUsers } from "../../store/users";

function UpdateProfilePhotoModal() {
  const transactionsOut = useSelector(state => state.transactions.transactions_out);
  const currentUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const [newProfilePhoto, setNewProfilePhoto] = useState(currentUser.profile_photo)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData()
    //   let username = currentUser.username
    //   let email = currentUser.email
    //   let firstname = currentUser.firstname
    //   let lastname = currentUser.lastname
    //   let phone_number = currentUser.phone_number
    //   let profile_photo = newProfilePhoto

    // formData.append('username', username)
    // formData.append('email', email)
    // formData.append('firstname', firstname)
    // formData.append('lastname', lastname)
    // formData.append('phone_number', phone_number)
    // formData.append('profile_photo', profile_photo)

    let data = {
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      phone_number: currentUser.phone_number,
      profile_photo: newProfilePhoto,
    }

    const updatedProfilePhoto = await dispatch(thunkUpdateProfilePhoto(data));
    if (!updatedProfilePhoto) {
      setErrors(updatedProfilePhoto);
    } else {
        // history.push("/activities");
        closeModal()
        await dispatch(thunkAllUsers())
        await dispatch(thunkAllActivities())
        await dispatch(authenticate())
    }
  };
  if(!currentUser) return <h1>Loading Profile...</h1>

  return (
    <div className="modlBody">
      <h1 className="modalTitle">Update Profile Photo</h1>
      <form className="modalFormBody" onSubmit={handleSubmit}>
        {/* {errors.length && (
        )} */}
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className='labelContainer'>
        <label className='labelContainer' >Profile Photo</label>
          <input
            className="inputBox"
            type="url"
            value={newProfilePhoto}
            onChange={(e) => setNewProfilePhoto(e.target.value)}
            required
          />
        </label>
        <div className="logInButtoncontainer">
          <button className="splashButton2" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfilePhotoModal;
