import React from "react";
import useModelProp from "../useModelProp";
import RecruiterMain from "./recruiterMain";
import ApplicationSubmission from "./applicationSubmission";
import FailedSignInView from "../views/failedSignInView";
import RolesEnum from "../rolesEnum";

/**
 * 
 * @param {UserModel} userModel
 * @param {ApplicationModel} applicationModel 
 * @param {Function} navToApplicationDetails 
 * @returns {RecruiterMain | ApplicationSubmission | FailedSignInView}
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
  /**
   * if the applicant or recruiter is signed in, 
   * The function will render the signout child component when a user is logged in
   */
  if(modelRoleId === RolesEnum.Recruiter) {
   return <RecruiterMain applicationModel={applicationModel} navToApplicationDetails={navToApplicationDetails}/>
  }
  else if(modelRoleId === RolesEnum.Applicant) {
   return <ApplicationSubmission applicationModel = {applicationModel}/>
  }
  //This can be kept or replaced with a toastify informing user to signin first.
  else {
    return React.createElement(FailedSignInView, {});
  }

}


export default RecruiterApplicantPresenter;
