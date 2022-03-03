import React from "react";
import useModelProp from "../useModelProp";
import NavigationView from "../views/navigationView";
import {toast} from 'react-toastify';

function Navigation({ userModel, applicationModel, children }) {
  // Observe the loggedIn property using observer pattern and React hooks
  const signedIn = useModelProp(userModel, "loggedIn"); 
  
  // Destructure the children array
  const [navigationSigninComponent, navigationSignupComponent, navigationSignoutComponent] = children; 

  // Observe the errorData property using observer pattern and React hooks
  const errorDataUser = useModelProp(userModel, "errorData"); 
  const errorDataApplication = useModelProp(applicationModel, "errorData"); 

  // The toggleState indicates whether the navigation bar is collapsed or not
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
  
  /**
   * if the applicant or recruiter is signed in, 
   * The function will render the signout child component when a user is logged in
   */
  if(signedIn) {
    return React.createElement(NavigationView, {
      component: navigationSignoutComponent,
      toggleState: toggleState,
      setToggleState: () => setToggleState(!toggleState),
      handleClose: () => setToggleState(false)
    });
  } 

  /**
   *  Render the signup and signin child components when a user is not logged in
   */
  return React.createElement(NavigationView, {
    component: [navigationSignupComponent, navigationSigninComponent],
    toggleState: toggleState,
    setToggleState: () => setToggleState(!toggleState),
    handleClose: () => setToggleState(false)
  }); 
}


export default Navigation;
