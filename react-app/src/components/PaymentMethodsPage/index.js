import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { thunkAllPaymentMethods, thunkDeletePaymentMethod } from "../../store/pymentmethods";
import { thunkAllActivities } from "../../store/activities";
import SideNavBarPage from "../SideNavBarPage";
import OpenModalButton from "../OpenModalButton";
import './PaymentMethodsPage.css'
import CreatePaymentMethodModal from "../CreatePaymentMethodModal";
import UpdatePaymentMethodModal from "../UpdatePaymentMethodModal";

function PaymentMethodsPage({isLoaded}) {
  const transactions = useSelector(state => state.transactions);
  const paymentMethodsObj = useSelector(state => state.paymentMethods.all_payment_methods)
  const currentUser = useSelector(state => state.session.user)
  console.log(paymentMethodsObj)
  // const allUsersObj = users.all_users
  const paymentMethodsArr = Object.values(paymentMethodsObj)
  console.log(paymentMethodsArr)

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  // const allTransactionsArr = Object.values(transactions.all_transactions)

  useEffect(() => {
		dispatch(thunkAllPaymentMethods()).then(() => setLoaded(true));
	}, [dispatch]);

  async function handleDelete(id) {
		const awaitedData = await dispatch(thunkDeletePaymentMethod(id)).then(dispatch(thunkAllActivities()));
		if (awaitedData) {
      alert("You have deleted this Payment Method")
		}
	}


  return loaded && (
    <div className="lowerPageContainer">
      <div className="leftLowerPageConainer">
        <SideNavBarPage/>
      </div>
      <div className="rightLowerPageContainer">
        <h1>Payment Method Page</h1>
        <div className="createCardContainer">
          <OpenModalButton
            buttonText="Add Payment Method"
            modalComponent={<CreatePaymentMethodModal />}
          />
        </div>
        <div className="allPaymentMethodsContainer">
          {(paymentMethodsArr.length && loaded) && paymentMethodsArr.map((card)=> (
            <div className="singleCardContainer" key={card.id}>
              <div className="topCardContainer">
                <div className="cardNumber">
                  <i class="fa-solid fa-lock"></i>**** **** **** {card.card_number.substr(card.card_number.length - 4)}
                </div>
              </div>
              <div className="bottomCardContainer">
                <div className="expiration date">
                  <i class="fa-regular fa-calendar-days"></i> {card.expiration_date.substr(0, card.expiration_date.length - 13)}
                </div>
                <div className="cvv">
                  <i class="fa-solid fa-lock"></i>**{card.cvv.substr(card.cvv.length - 1)}
                </div>
              </div>
              <div className="BottomCardButtonContainer">
              <OpenModalButton
                    buttonText="Update"
                    // onItemClick={closeMenu}
                    modalComponent={<UpdatePaymentMethodModal paymentmethod_id={card.id} />}
                  />
                  <button className="deleteButton" onClick={()=>handleDelete(card.id)}>
                    Delete
                  </button>

              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )

  // if(!allUsersArr.length){
  //    return (
  //      <h1> <i class="fa-solid fa-comments-dollar"></i> Stash App is loading...</h1>
  //    )
  //  }

	//  return loaded && (
	//  	<div className="lowerPageContainer">
  //      <div className="leftLowerPageConainer">
  //        <SideNavBarPage/>
  //      </div>
  //      <div className="rightLowerPageContainer">
  //      <h1>Payment Informtion Page</h1>
  //        <div className='transactionContainer'>

  //        {loaded && allTransactionsArr.map((transaction)=> (
  //         <div key={transaction.id} className='transactionBar'>
  //           <div className='transactionInnerBar'>
  //             {/* get name by getting all users in session state and keying into it with the id from this list */}
  //             <i class="fa-regular fa-circle-user fa-xl"></i>
  //             <div>{allUsersObj[transaction.sender_id].firstname} {allUsersObj[transaction.sender_id].lastname}</div>
  //             <div>{transaction.created_at}</div>
  //             <div>{transaction.payment_message}</div>
  //             <div>${transaction.payment_amount}</div>
  //             {(currentUser.id === transaction.sender_id) && (
  //               <div>
  //                 <OpenModalButton
  //                   buttonText="Update"
  //                   // onItemClick={closeMenu}
  //                   modalComponent={<UpdateTransactionModal transaction_id={transaction.id} />}
  //                 />
  //                 <button onClick={()=>handleDelete(transaction.id)}>
  //                   Delete
  //                 </button>
  //               </div>
  //             )
  //             }
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     </div>
	// 	</div>
	// );
}

export default PaymentMethodsPage;
