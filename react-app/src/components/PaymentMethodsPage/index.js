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

  const paymentMethodsArr = Object.values(paymentMethodsObj)

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

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
      <div className="PageTitleContainer">
        <h1 className="PageTitle">Payment Methods</h1>
      </div>
      <div className="button-paymentMethod-Container">
        <div className="createCardContainer">
          <OpenModalButton
            buttonText="Add Payment Method"
            modalComponent={<CreatePaymentMethodModal  />}
          />
        </div>
        <div className="allPaymentMethodsContainer">
          {(paymentMethodsArr.length > 0 && loaded) && paymentMethodsArr.map((card)=> (
            <div className="singleCardContainer" key={card.id}>
              <div className="topCardContainer">
                <div className="cardNumber">
                  <i class="fa-solid fa-lock"></i> **** **** **** {card.card_number.substr(card.card_number.length - 4)}
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
        {paymentMethodsArr.length === 0 &&
          <div className="empty-page-message-container-outer">
            {/* <img className="empty-page-message-green-arrow" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREBlzaNt8U0SchnnFmvz06Lhj0-hwzQNwlB-uAbQgbwgQ0FFnRuPij9wVEy83UwXnB-T4&usqp=CAU"></img> */}
            <div className="empty-page-message-container">
              <div className="empty-page-message">
                You currently have no payment methods on file!
              </div>
              <div className="empty-page-message">
                Click the "Add Payment Method" button above to create 
              </div>
              <div className="empty-page-message">
                your first payment method!
              </div>
            </div>
          </div>
        }
      </div>
      </div>
    </div>
  )
}

export default PaymentMethodsPage;
