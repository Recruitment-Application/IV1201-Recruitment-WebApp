import React from "react";
import useModelProp from "../useModelProp";
import NavigationView from "../views/navigationView";
import {toast} from 'react-toastify';

/**
 * The presenter is responsible for which button will be displayed according to the signed in status. 
 * The status is either signedIn or not (True or false) using the useModelProp which return a specific component in the passed Model (userModel).
 * An error toast will be displayed to the user in case there is any error occured while signing in.
 * Another error toast will be displayed to the user in case there is any error occured will creating an instance of the Application Model
 * 
 * @param {UserModel} userModel The userModel includes data about the signed in user data.
 * @param {ApplicationModel} applicationModel The application Model is used in the toast to check if there is any error occured in it.
 * @param {Component} children to twtich the state of the sign in status. 
 * @returns {NavigationView} A react element of the NavigationView. 
 *                           Toggle state between (username and signout) button if the user is signed in, 
 *                           and (Signup and signin) buttons if the user has not signed in yet.
 *                    
 */
function Navigation({ userModel, applicationModel, children }) {
  
  const signedIn = useModelProp(userModel, "loggedIn"); 
  const [navigationSigninComponent, navigationSignupComponent, navigationSignoutComponent] = children; 
  const errorDataUser = useModelProp(userModel, "errorData"); 
  const errorDataApplication = useModelProp(applicationModel, "errorData"); 
  const [toggleState, setToggleState] = React.useState(false); 

  if (errorDataUser) {
    toast.error(errorDataUser.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    userModel.emptyErrorData();
  }

  if (errorDataApplication) {
    toast.error(errorDataApplication.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    applicationModel.emptyErrorData();
  }
  

  if(signedIn) {
    return React.createElement(NavigationView, {
      component: navigationSignoutComponent,
      toggleState: toggleState,
      setToggleState: () => setToggleState(!toggleState),
      handleClose: () => setToggleState(false)
    });
  } 

  return React.createElement(NavigationView, {
    component: [navigationSignupComponent, navigationSigninComponent],
    toggleState: toggleState,
    setToggleState: () => setToggleState(!toggleState),
    handleClose: () => setToggleState(false)
  }); 
}


export default Navigation;
