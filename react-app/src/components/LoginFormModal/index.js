import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const demoInput = () => {
		setEmail("demo@aa.io");
		setPassword("password");
	};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        history.push("/activities");
        closeModal()
    }
  };

  return (
    <div className="modlBody">
      <h1 className="modalTitle">Log In</h1>
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
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="logInButtoncontainer">
          <button className="splashButton2" type="submit">
            Log In
          </button>
          <button className="splashButton2" onClick={demoInput}>
				  	Demo User
				  </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
