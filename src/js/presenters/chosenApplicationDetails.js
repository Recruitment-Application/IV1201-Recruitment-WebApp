import React from "react";
import useModelProp from "../useModelProp";
import ChosenApplicationDetailsView from "../views/chosenApplicationDetailsView";
import RolesEnum from "../rolesEnum";
import NoApplicantAccessView from "../views/noApplicantAccess";
import FailedSignInView from "../views/failedSignInView";
import { toast } from 'react-toastify';

function ChosenApplicationDetails({ userModel, applicationModel, navToApplicationsList }) {


  const [decision, setDecision] = React.useState("");

  const decisionList = ["Accepted", "Rejected", "Unhandled"];

  let applicationId = useModelProp(applicationModel, "currentApplicationID");
  let chosenApplicationDetails = useModelProp(applicationModel, "chosenApplicationData");

  let modelRoleId = useModelProp(userModel, "role");

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
   return React.createElement(NoApplicantAccessView, {});
  }
  else {
   return React.createElement(FailedSignInView, {});
  }
}
export default ChosenApplicationDetails;
