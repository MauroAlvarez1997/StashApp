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
  let currExpDateFormted = expDateUnformted.getFullYear().toString() + '-' + (expDateUnformted.getMonth() + 1).toString().padStart(2, 0) + '-' + (expDateUnformted.getDate() + 1).toString().padStart(2, 0);


  let date = new Date()
  const finalDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + (date.getDate() + 1).toString().padStart(2, 0);


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
        min={finalDate}
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        required
       >
       </input>
     </label>
     <div className="logInButtoncontainer">
       <button className="splashButton2" type='submit'>
         Update Card
       </button>
     </div>
     </form>
  </div>
  );
}

export default UpdatePaymentMethodModal;
