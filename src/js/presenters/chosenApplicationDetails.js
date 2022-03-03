import React from "react";
import useModelProp from "../useModelProp";
import ChosenApplicationDetailsView from "../views/chosenApplicationDetailsView";
import RolesEnum from "../rolesEnum";
import NoApplicantAccessView from "../views/noApplicantAccess";
import FailedSignInView from "../views/failedSignInView";

function ChosenApplicationDetails({ userModel, applicationModel, navToApplicationsList }) {

  //console.log(1);
  const [decision, setDecision] = React.useState("");

  const signedIn = true;

  // const tempapplicationData = ["Garo", "Malko", "Ticket Seller", "17/2/2022", "20/2/2022", 5, 2];
  const decisionList = ["Accepted", "Rejected", "Unhandled"];

  let modelRoleId = useModelProp(userModel, "role");

  let applicationId = useModelProp(applicationModel, "currentApplicationID");
  let chosenApplicationDetails = useModelProp(applicationModel, "chosenApplicationData");;


  if (modelRoleId === RolesEnum.Recruiter) {
    /**
     * send the required data to render the ChosenApplicationDetailsView and return an action for the made decision by the recruiter.
     */
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
    React.createElement(NoApplicantAccessView, {})
  }
  else {
    React.createElement(FailedSignInView, {})
  }
}
export default ChosenApplicationDetails;
