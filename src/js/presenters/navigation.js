import React from "react";
import useModelProp from "../useModelProp";
import NavigationView from "../views/navigationView";

function Navigation({ userModel, children }) {

  const signedIn = useModelProp(userModel, "loggedIn"); // Observe the loggedIn property using observer pattern and React hooks
  
  const [navigationSigninComponent, navigationSignupComponent, navigationSignoutComponent] = children; // Destructure the children array

  const [toggleState, setToggleState] = React.useState(false); // The toggleState indicates whether the navigation bar is collapsed or not

  // if (errorData) {
  //   toast.error(errorData.message, {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 4000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined
  //   });
  //   userModel.emptyErrorData();
  // } // Show an error message when an error occurs 
  
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
