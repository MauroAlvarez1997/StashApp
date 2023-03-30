import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import ActivitiesPage from './components/ActivitiesPage'
import SideNavBarPage from "./components/SideNavBarPage";
import PaymentMethodsPage from "./components/PaymentMethodsPage";
import FundsPage from "./components/FundsPage";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />

      {/* {sessionUser &&
          <SideNavBarPage className='sideNavBar' isLoaded={isLoaded} />
      } */}
      {isLoaded && (
        <Switch>
          <Route  path="/activities" >
            <ActivitiesPage isLoaded={isLoaded} />
          </Route>
          <Route  path="/payment-methods" >
            <PaymentMethodsPage isLoaded={isLoaded} />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/funds">
            <FundsPage />
          </Route>
          <Route exact path='/'>
						<SplashPage />
					</Route>
        </Switch>
      )}

    </>
  );
}

export default App;
