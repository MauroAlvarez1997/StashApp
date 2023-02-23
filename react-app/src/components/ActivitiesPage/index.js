import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { thunkAllActivities } from "../../store/activities";
import { thunkAllUsers } from "../../store/users";
import SideNavBarPage from "../SideNavBarPage";
import './ActivitiesPage.css'


function ActivitiesPage({isLoaded}) {
  const transactions = useSelector(state => state.transactions);
  const users = useSelector(state => state.users)
  const allUsersObj = users.all_users
  const allUsersArr = Object.values(allUsersObj)

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const allTransactionsArr = Object.values(transactions.all_transactions)

  useEffect(() => {
		dispatch(thunkAllActivities()).then(dispatch(thunkAllUsers())).then(() => setLoaded(true));
	}, [dispatch]);

  if(!allUsersArr.length){
    return (
      <h1> <i class="fa-solid fa-comments-dollar"></i> Stash App is loading...</h1>
    )
  }

	return loaded && (
		<div className="lowerPageContainer">
      <div className="leftLowerPageConainer">
        <SideNavBarPage/>
      </div>
      <div className="rightLowerPageContainer">
      <h1>ActivitiesPage</h1>
        <div className='transactionContainer'>

        {loaded && allTransactionsArr.map((transaction)=> (
          <div key={transaction.id} className='transactionBar'>
            <div className='transactionInnerBar'>
              {/* get name by getting all users in session state and keying into it with the id from this list */}
              <i class="fa-regular fa-circle-user fa-xl"></i>
              <div>{allUsersObj[transaction.sender_id].firstname} {allUsersObj[transaction.sender_id].lastname}</div>
              <div>{transaction.created_at}</div>
              <div>{transaction.payment_message}</div>
              <div>${transaction.payment_amount}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
		</div>
	);
}

export default ActivitiesPage;
