import React from "react";
import useModelProp from "../useModelProp";
import RecruiterMain from "./recruiterMain";
import ApplicationSubmission from "./applicationSubmission";
import FailedSignInView from "../views/failedSignInView";

function RecruiterApplicantPresenter({ userModel, applicationModel, goToApplicationDetails, goToHome }) {

  const loggedIn = useModelProp(userModel, "loggedIn"); // Observe the loggedIn property using observer pattern and React hooks

  const [toggleState, setToggleState] = React.useState(false); // The toggleState indicates whether the navigation bar is collapsed or not

  const modelRoleId = useModelProp(userModel, "role");
 
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

  if(modelRoleId == 1) {
   return <RecruiterMain userModel={userModel} applicationModel={applicationModel} navToApplicationDetails={goToApplicationDetails}/>
  }
  else if(modelRoleId == 2) {
   return <ApplicationSubmission userModel = {userModel} applicationModel = {applicationModel} navToHome = {goToHome}/>
  }
  //This can be kept or replaced with a toastify informing user to signin first.
  else {
    return React.createElement(FailedSignInView, {});
  }

}


export default RecruiterApplicantPresenter;
