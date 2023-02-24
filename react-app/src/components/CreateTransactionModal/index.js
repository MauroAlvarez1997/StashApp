import React, { useState } from "react";
import { thunkCreateActivity } from "../../store/activities";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


function CreateTransactionModal() {
  const allUsersObj = useSelector(state => state.users.all_users);
  const currentUser = useSelector(state => state.session.user);
  let allUsersArr = Object.values(allUsersObj)
  let paymentMethodsArr = ['', ...currentUser.payment_methods]

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('')
  const [amount, setAmount] = useState(0)

  const filteredUsersArr = ['', ...allUsersArr?.filter(user => user.id !== currentUser.id)]
  const filteredUsersObj = {}
  filteredUsersArr.forEach((element) => (filteredUsersObj[element.username] = element));
  let selectUser = filteredUsersObj[recipient]

  const paymentMethodsObj = {}
  paymentMethodsArr.forEach((element) => (paymentMethodsObj[element.card_number] = element));
  let selectPaymentMethod = paymentMethodsObj[paymentMethod]

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      sender_id: currentUser.id,
      recipient_id: selectUser.id,
      payment_method_id: selectPaymentMethod.id,
      payment_amount: amount,
      payment_message: message,
    }

    const createdActivity = await dispatch(thunkCreateActivity(data));

    if (createdActivity) {
      setErrors(createdActivity);
    } else {
      closeModal()
    }
  };

  return (
    <div>
      <h1>Send Money</h1>
      <form onSubmit={handleSubmit}>
      <label >
				Amount: $
				<input
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					min={0}
				/>
			</label>
      <label>
         Recipient
         <select
           type="text"
           value={recipient}
           onChange={(e) => setRecipient(e.target.value)}
           required
         >
          {filteredUsersArr.map((option) => (
									<option key={option.id}>{option.username}</option>
								))}
         </select>
       </label>
       <label>
         Payment Method
         <select
           type="text"
           value={paymentMethod}
           onChange={(e) => setPaymentMethod(e.target.value)}
           required
         >
          {paymentMethodsArr.map((option) => (
									<option key={option.id}>{option.card_number}</option>
								))}
         </select>
       </label>
       <label className='create-profile-field'>
			  	Message:
			  	<input
			  		type='text'
			  		value={message}
			  		onChange={(e) => setMessage(e.target.value)}
			  		required
			  		maxLength={150}
			  	/>
			  </label>
        <button type='submit'>
					Send Money
				</button>
      </form>

    </div>
  )
}

export default CreateTransactionModal;
