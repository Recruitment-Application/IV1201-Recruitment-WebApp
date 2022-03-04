import React from "react";
import useModelProp from "../useModelProp";
import ChosenApplicationDetailsView from "../views/chosenApplicationDetailsView";
import RolesEnum from "../rolesEnum";
import NoApplicantAccessView from "../views/noApplicantAccess";
import FailedSignInView from "../views/failedSignInView";

/**
 * The presenter of the View (ChosenApplicationDetailsView) 
 * which render the details of the chosen application by the signedin recruiter 
 * and let the recuirter to make a decision for the chosen applicaiton (Accepted, Rejected or Unhandled).
 * 
 * @param {UserModel} userModel The userModel that includes signedin user data.
 * @param {ApplicationModel} applicationModel The applicationModel that includes data about the filtered application, chosen application data, etc.
 * @param {Function} navToApplicationsList After making the decision, To presenter is being return the recruiter to the recruiterMain presenter.
 * @returns {ChosenApplicationDetailsView | NoApplicantAccessView | FailedSignInView} Rendered react element of the ChosenApplicationDetailsView with the passed data. 
 *                                                                                   It gives the recruiter the options to make a decision for the chosen application to register later in the database.
 *                                                                                   If the signedin user is an applicant. It will return a react elemenet View of "NoApplicantAccessView" 
 *                                                                                   wich tells that the signedin user doesn't have the permission to visit this page.
 *                                                                                   If the website visitor hasn't signed in yet. It will return a React element of the view "FailedSignInView" which informs the visitor to signin first.
 */
function ChosenApplicationDetails({ userModel, applicationModel, navToApplicationsList }) {

  const [decision, setDecision] = React.useState("");
  const decisionList = ["Accepted", "Rejected", "Unhandled"];
  let applicationId = useModelProp(applicationModel, "currentApplicationID");
  let chosenApplicationDetails = useModelProp(applicationModel, "chosenApplicationData");
  let modelRoleId = useModelProp(userModel, "role");
  if (modelRoleId === RolesEnum.Recruiter) {

    return (
      chosenApplicationDetails &&
      React.createElement(ChosenApplicationDetailsView, {
        applicationData: chosenApplicationDetails,
        decisionList: decisionList,
        setDecision: takenDecision => setDecision(takenDecision),
        makeDescision: () => {
          applicationModel.updateApplicationDecision(applicationId, decision);
        },
        navToApplicationsList: navToApplicationsList,
      })
    );
  }
  else if (modelRoleId === RolesEnum.Applicant) {
   return React.createElement(NoApplicantAccessView, {});
  }
  else {
   return React.createElement(FailedSignInView, {});
  }
}
export default ChosenApplicationDetails;
