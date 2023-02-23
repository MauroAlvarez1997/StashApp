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
      {sessionUser &&
          <SideNavBarPage isLoaded={isLoaded} />
      }
      {isLoaded && (
        <Switch>
          <Route isLoaded={isLoaded} path="/activities" >
            <ActivitiesPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
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
