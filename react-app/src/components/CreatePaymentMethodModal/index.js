import React, { useState } from "react";
import { thunkCreatePaymentMethod } from "../../store/pymentmethods";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


function CreatePaymentMethodModal() {
  const currentUser = useSelector(state => state.session.user);
  let date = new Date()
  const final = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + (date.getDate() + 1 ).toString().padStart(2, 0);

  console.log(final)

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState(final)


  console.log(expirationDate)



  const handleSubmit = async (e) => {
    e.preventDefault();
    const stringCardNumber = cardNumber.toString()
    const stringCVV = cvv.toString()
    let data = {
      card_number: stringCardNumber,
      cvv: stringCVV,
      expiration_date: expirationDate,
      user_id: currentUser.id,
    }

    const createdPaymentMethod = await dispatch(thunkCreatePaymentMethod(data));
    if (createdPaymentMethod) {
      setErrors(createdPaymentMethod);
    } else {
      closeModal()
    }
  };

  return (
    <div className="modlBody">
      <h1 className="modalTitle">Input Card Informtion</h1>
      <form className="modalFormBody" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      <label className='labelContainer'>
				Card Number:
				<input
        className="inputBox"
					type='tel'
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          maxLength="16"
          minLength="16"
          placeholder="xxxxxxxxxxxxxxxx"
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
					required
				/>
			</label>
      <label className='labelContainer'>
         CVV:
         <input
         className="inputBox"
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{3,3}"
            placeholder="xxx"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            minLength={3}
            maxLength={3}
         >
         </input>
       </label>
       <label className='labelContainer'>
         Expiration Date:
         <input
         className="inputBox"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          min={final}
          required
         >
         </input>
       </label>
       <div className="logInButtoncontainer">
         <button className="splashButton2" type='submit'>
           Create Card
         </button>
       </div>
       </form>


    </div>
  )
}

export default CreatePaymentMethodModal;
