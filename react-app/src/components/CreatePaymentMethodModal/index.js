import React, { useState } from "react";
import { thunkCreatePaymentMethod } from "../../store/pymentmethods";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


function CreatePaymentMethodModal() {
  const currentUser = useSelector(state => state.session.user);
  let date = new Date()
  const final = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + (date.getDate() + 1 ).toString().padStart(2, 0);

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState(final)
  const [amount, setAmount] = useState(0)


  // let cardIsNum = /^\d+$/.test(cardNumber);
  // let cvvIsNum = /^\d+$/.test(cvv);

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
    <div>
      <h1>Input Card Informtion</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      <label >
				Card Number:
				<input
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
      <label>
         CVV:
         <input
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
       <label>
         Expiration Date:
         <input
           type="date"
           value={expirationDate}
           onChange={(e) => setExpirationDate(e.target.value)}
            min={final}
           required
         >
         </input>
       </label>
         <button type='submit'>
           Create Card
         </button>
       </form>


    </div>
  )
}

export default CreatePaymentMethodModal;
