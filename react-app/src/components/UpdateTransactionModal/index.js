import React, { useState } from "react";
import { thunkUpdateActivity } from "../../store/activities";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


function UpdateTransactionModal({transaction_id}) {
  const transactionsOut = useSelector(state => state.transactions.transactions_out);
  const currentTransaction = transactionsOut[transaction_id]

  const dispatch = useDispatch();
  const [message, setMessage] = useState(currentTransaction.payment_message);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      sender_id: currentTransaction.sender_id,
      recipient_id: currentTransaction.recipient_id,
      payment_method_id: currentTransaction.payment_method_id,
      payment_amount: currentTransaction.payment_amount,
      payment_message: message,
      // created_at: currentTransaction.created_at,
    }

    const updatedTransaction = await dispatch(thunkUpdateActivity(data, transaction_id));
    if (updatedTransaction) {
      setErrors(updatedTransaction);
    } else {
        // history.push("/activities");
        closeModal()
    }
  };
  if(!currentTransaction) return <h1>Loading Transaction...</h1>

  return (
    <div className="modlBody">
      <h1 className="modalTitle">Update</h1>
      <form className="modalFormBody" onSubmit={handleSubmit}>
        {/* {errors.length && (
        )} */}
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className='labelContainer'>
          Message
          <input
          className="inputBox"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

export default UpdateTransactionModal;
