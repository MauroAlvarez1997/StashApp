import React, { useState } from "react";
import { thunkUpdatePaymentMethod } from "../../store/pymentmethods";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


function UpdatePaymentMethodModal({paymentmethod_id}) {
  const allPaymentMethods = useSelector(state => state.paymentMethods.all_payment_methods);
  const currentPaymentMethod = allPaymentMethods[paymentmethod_id]
  const currentUser = useSelector(state => state.session.user);

  let expDateUnformted = new Date(currentPaymentMethod.expiration_date)
  let currExpDateFormted = expDateUnformted.getFullYear().toString() + '-' + (expDateUnformted.getMonth() + 1).toString().padStart(2, 0) + '-' + (expDateUnformted.getDate() + 1 ).toString().padStart(2, 0);


  let date = new Date()
  const final = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + (date.getDate() + 1 ).toString().padStart(2, 0);

  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState(currentPaymentMethod.card_number);
  const [cvv, setCvv] = useState(currentPaymentMethod.cvv);
  const [expirationDate, setExpirationDate] = useState(currExpDateFormted);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      card_number: cardNumber,
      cvv: cvv,
      expiration_date: expirationDate,
      user_id: currentUser.id
    }

    const updatedUpdatePaymentMethod = await dispatch(thunkUpdatePaymentMethod(data, paymentmethod_id));

    if (updatedUpdatePaymentMethod) {
      setErrors(updatedUpdatePaymentMethod);
    } else {
        // history.push("/activities");
        closeModal()
    }
  };
  if(!currentPaymentMethod) return <h1>Loading Transaction...</h1>

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
         Update Card
       </button>
     </form>
  </div>
  );
}

export default UpdatePaymentMethodModal;
