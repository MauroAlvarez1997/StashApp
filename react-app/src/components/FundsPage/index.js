import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { thunkAllPaymentMethods, thunkDeletePaymentMethod } from "../../store/pymentmethods";
import { thunkAllActivities } from "../../store/activities";
import SideNavBarPage from "../SideNavBarPage";
import OpenModalButton from "../OpenModalButton";
import './FundsPage.css'
import { thunkUpdateFunds } from "../../store/funds";
import { authenticate } from "../../store/session";

function FundsPage({isLoaded}) {

  const paymentMethodsObj = useSelector(state => state.paymentMethods.all_payment_methods)
  const currentUser = useSelector(state => state.session.user)

  const [amount, setAmount] = useState(0)

  const paymentMethodsArr = Object.values(paymentMethodsObj)

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
		dispatch(thunkAllPaymentMethods()).then(() => setLoaded(true));
	}, [dispatch]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const total = Number(amount) + Number(currentUser.funds)
    let data = {
      user_id: currentUser.id,
      funds: total,

    }

    const updatedFunds = await dispatch(thunkUpdateFunds(data)).then(dispatch(authenticate()));

    if (updatedFunds) {
      alert("Could not add funds at this time, please try again later.")
    } 
  };

  async function setToZero() {
		let data = {
      user_id: currentUser.id,
      funds: 0,
    }
    const updatedFunds = await dispatch(thunkUpdateFunds(data)).then(dispatch(authenticate()));
		if (updatedFunds) {
      alert("Your funds have been transfered to your bank account.")
		}
	}

  return loaded && (
    <div className="lowerPageContainer">
      <div className="leftLowerPageConainer">
        <SideNavBarPage/>
      </div>
      <div className="rightLowerPageContainer">
      <div className="PageTitleContainer">
        <h1 className="PageTitle">Manage Funds</h1>
      </div>
      <div className="button-paymentMethod-Container">
        <div className="createCardContainer">
          {/* -------------------------------------------------------- */}
        </div>
        <div className="allPaymentMethodsContainer">
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
            <div className="logInButtoncontainer">
            <button className="splashButton2" type='submit'>
		    			Add Cash
		    		</button>
            </div>
          </form>
            <button className="deleteButton" onClick={()=>setToZero()}>
		    			Cash Out
		    		</button>
          {/* ---------------------------------------------- */}
        </div>
      </div>
      </div>
    </div>
  )
}

export default FundsPage;
