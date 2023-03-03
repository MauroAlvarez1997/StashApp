import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, firstName, lastName, phoneNumber));
			if (data) {
				setErrors(data);
			} else {
				history.push("/activities");
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="modlBody">
			<h1 className="modalTitle">Sign Up</h1>
			<form className="modalFormBody" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className='labelContainer'>
					Email
					<input
						className="inputBox"
						placeholder="Ex: Tony@aa.io"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className='labelContainer'>
					Username
					<input
					className="inputBox"
						type="text"
						placeholder="Ex: TonyTheTiger"
						maxLength="15"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className='labelContainer'>
          First Name
          <input
					className="inputBox"
            type="text"
						placeholder="Ex: Tony"
						maxLength="15"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className='labelContainer'>
          Last Name
          <input
					className="inputBox"
            type="text"
						placeholder="Ex: Montana"
						maxLength="15"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className='labelContainer'>
          Phone Number
          <input
					className="inputBox"
            type="tel"
						placeholder="enter 10 digit number"
						pattern="[0-9\s]{10,10}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            minLength="10"
            maxLength="10"
            required
          />
        </label>
				<label className='labelContainer'>
					Password
					<input
					className="inputBox"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className='labelContainer'>
					Confirm Password
					<input
					className="inputBox"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<div className="logInButtoncontainer">
					<button className="splashButton2" type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
