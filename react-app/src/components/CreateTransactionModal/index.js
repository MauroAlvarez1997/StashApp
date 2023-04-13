import React, { useState, useEffect } from "react";
import { thunkCreateActivity } from "../../store/activities";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkAllPaymentMethods } from "../../store/pymentmethods";
import { thunkUpdateFunds } from "../../store/funds";
import { authenticate } from "../../store/session";
import { thunkAllUsers } from "../../store/users";

function CreateTransactionModal() {
  const allUsersObj = useSelector(state => state.users.all_users);
  const currentUser = useSelector(state => state.session.user);
  const statePaymentMethodsObj = useSelector(state => state.paymentMethods);

  let allUsersArr = Object.values(allUsersObj)
  let initialPayMethodArr = Object.values(statePaymentMethodsObj.all_payment_methods)
  let paymentMethodsArr = [...initialPayMethodArr]

  let optionsArr = ['', 'Use Stash' , ...initialPayMethodArr.map((option)=> option.card_number)]


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
		dispatch(thunkAllPaymentMethods()).then(dispatch(thunkAllUsers())).then(() => setLoaded(true));
	}, [dispatch]);

  const filteredUsersArr = ['', ...allUsersArr?.filter(user => user.id !== currentUser.id)]
  const filteredUsersObj = {}
  filteredUsersArr.forEach((element) => (filteredUsersObj[element.username] = element));
  let selectUser = filteredUsersObj[recipient]
  console.log('CCCCCCCCCC', filteredUsersArr)

  const paymentMethodsObj = {}
  paymentMethodsArr.forEach((element) => (paymentMethodsObj[element.card_number] = element));
  let selectPaymentMethod = paymentMethodsObj[paymentMethod]


  const handleSubmit = async (e) => {

    e.preventDefault();

    if(paymentMethod=== 'Use Stash'){
      let defaultPayment = paymentMethodsArr[0].id
      const total = Number(currentUser.funds) - Number(amount)

      let data = {
        sender_id: currentUser.id,
        recipient_id: selectUser.id,
        payment_method_id: defaultPayment,
        payment_amount: amount,
        payment_message: message,
      }
      let fundsData = {
        user_id: currentUser.id,
        funds: total,
      }
      if(total<0){
        alert('Sorry, you do not have enough funds at this time.')
      }else{
        const createdActivity = await dispatch(thunkCreateActivity(data)).then( dispatch(thunkUpdateFunds(fundsData))).then(dispatch(authenticate()));
        if (createdActivity) {
          setErrors(createdActivity);
        } else {
          closeModal()
        }
      }

    } else {
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
    }
  };

  if(!initialPayMethodArr.length){
    return (
      <div className="empty-page-message">Can't create transactions without a payment method!</div>
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
					min={1}
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
          {optionsArr.map((option) => (
									<option className="inputBox" >{option}</option>
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
