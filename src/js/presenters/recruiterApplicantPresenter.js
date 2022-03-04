import React from "react";
import useModelProp from "../useModelProp";
import RecruiterMain from "./recruiterMain";
import ApplicationSubmission from "./applicationSubmission";
import FailedSignInView from "../views/failedSignInView";
import RolesEnum from "../rolesEnum";

/**
 * The presenter chooses whether the Recruiter or Application presenter will be presented depending on the signed user.
 * @param {UserModel} userModel an object includes data about the signed in user, if the user is either recruiter or applicant. 
 * @param {ApplicationModel} applicationModel an object includes data that checks if the competenceTypeList has been filled once or not (to prevent be filled multiple times).
 * The model is passed later to the RecruiterMain and ApplicationSubmission presenters.
 * @param {Function} navToApplicationDetails take the user back to Application Details page
 * @returns {RecruiterMain | ApplicationSubmission | FailedSignInView} The presenter RecruiterMain if the signed in user is a recruiter.
 *                                                                     The ApplicationSubmission if the signed in user is an applicant.
 *                                                                     A react element of the FailedSignInView that let the visitor to know 
 *                                                                     the page needs a signin first. 
 */

function RecruiterApplicantPresenter({ userModel, applicationModel, navToApplicationDetails }) {
  const modelRoleId = useModelProp(userModel, "role");
  let filledDataOnceInList = useModelProp(applicationModel, "filledDataOnce");
  
  React.useEffect(
    function () {
      if ( (modelRoleId === RolesEnum.Applicant || modelRoleId === RolesEnum.Recruiter) && filledDataOnceInList === false) {
        applicationModel.getJobs();
      }
    },
    [modelRoleId]
  );

  if(modelRoleId === RolesEnum.Recruiter) {
   return <RecruiterMain applicationModel={applicationModel} navToApplicationDetails={navToApplicationDetails}/>
  }
  else if(modelRoleId === RolesEnum.Applicant) {
   return <ApplicationSubmission applicationModel = {applicationModel}/>
  }
  else {
    return React.createElement(FailedSignInView, {});
  }
}

export default RecruiterApplicantPresenter;