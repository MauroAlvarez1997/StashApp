import React, { useState, useEffect } from "react";
import { thunkCreateActivity } from "../../store/activities";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkAllPaymentMethods } from "../../store/pymentmethods";

function CreateTransactionModal() {
  const allUsersObj = useSelector(state => state.users.all_users);
  const currentUser = useSelector(state => state.session.user);
  const statePaymentMethodsObj = useSelector(state => state.paymentMethods);

  console.log('HELLO FORM INSIDE THE MODAL', statePaymentMethodsObj)

  let allUsersArr = Object.values(allUsersObj)
  let initialPayMethodArr = Object.values(statePaymentMethodsObj.all_payment_methods)
  let paymentMethodsArr = ['', ...initialPayMethodArr]

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('')
  const [amount, setAmount] = useState(0)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
		dispatch(thunkAllPaymentMethods()).then(() => setLoaded(true));
	}, [dispatch]);

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

  if(!initialPayMethodArr.length){
    return (
      <h1>Can't create transaction without payment methods</h1>
    )
  }

  return loaded && (
    <div className="modlBody">
      <h1 className="modalTitle">Send Money</h1>
      <form className="modalFormBody" onSubmit={handleSubmit}>
      <label className='labelContainer'>
				Amount: $
				<input
        className="inputBox"
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					min={0}
				/>
			</label>
      <label className='labelContainer'>
         Recipient
         <select
          className="inputBox"
           type="text"
           value={recipient}
           onChange={(e) => setRecipient(e.target.value)}
           required
         >
          {filteredUsersArr.map((option) => (
									<option className="inputBox" key={option.id}>{option.username}</option>
								))}
         </select>
       </label>
       <label className='labelContainer'>
         Payment Method
         <select
         className="inputBox"
           type="text"
           value={paymentMethod}
           onChange={(e) => setPaymentMethod(e.target.value)}
           required
         >
          {paymentMethodsArr.map((option) => (
									<option className="inputBox" key={option.id}>{option.card_number}</option>
								))}
         </select>
       </label >
       <label className='labelContainer'>
			  	Message:
			  	<input
          className="inputBox"
			  		type='text'
			  		value={message}
			  		onChange={(e) => setMessage(e.target.value)}
			  		required
			  		maxLength={150}
			  	/>
			  </label>
        <div className="logInButtoncontainer">
        <button className="splashButton2" type='submit'>
					Send Money
				</button>
        </div>
      </form>

    </div>
  )
}

export default CreateTransactionModal;
