import React from "react";
import useModelProp from "../useModelProp";
import RecruiterFilterView from "../views/recruiterFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

import { toast } from 'react-toastify';

/**
 * The RecruiterMain is responsible for the filter bar where the recruiter chooses which attribute will be used for the applications filtering.
 * According to the chosen attribute, the FilteredApplicationsView view will list the applications.
 * When the recruiter chooses an application, and makes a decision for that application, a notification will be shown to the recruiter to verify 
 * the made decision with the application id as a notification. 
 * @param {ApplicationModel} applicationModel contains data about the competenceType list, the filtered application using the chosen attributes, 
 *                                            the chosen application details to be used for the notification and the made decision of the chosen application.
 * @param {Function} navToApplicationDetails  Takes the recruiter to the applicationDetails view when an application is chosen to be displayed.
 * @returns {RecruiterFilterView & FilteredApplicationsView} RecruiterFilterView to let the user to enter the desired attributes data to filter 
 *                                                           the applications depending on. 
 *                                                           FilteredApplicationsView will be displayed when the "Filter application" button is pressed. 
 *                                                           It displays the filtered applications.
 */
function RecruiterMain({ applicationModel, navToApplicationDetails }) {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [name, setName] = React.useState("");
  const [chosenCompetence, setChosenCompetence] = React.useState("");

  let competenceType = useModelProp(applicationModel, "competenceList");
  let modelApplicationsList = useModelProp(applicationModel, "applicationsList");
  let pageNum = 0;
  let chosenApplicationDetails = useModelProp(applicationModel, "chosenApplicationData");
  let latestApplicationDecision = useModelProp(applicationModel, "latestApplicationDecision");


  if(chosenApplicationDetails !== null &&  latestApplicationDecision !== null) {
    let message = `You have made a new decision "${latestApplicationDecision}"for the application with the id: ${chosenApplicationDetails.applicationID}`; 
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored"
    });
    applicationModel.emptyChosenApplicationData();
  }
  
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(RecruiterFilterView, {
      setName: name => setName(name),
      competenceTypesList: competenceType,
      chosenCompetence: chosenCompetence => setChosenCompetence(chosenCompetence),
      fromDate: fromDate,
      setFromDate: startDate => setFromDate(startDate),
      toDate: toDate,
      setToDate: toDate => setToDate(toDate),
      handleAppliedFilter: () => {
        applicationModel.filterUnFilteredApplicationsData(name, chosenCompetence, fromDate, toDate, pageNum);
      },
    }),
    modelApplicationsList &&
    React.createElement(FilteredApplicationsView, {
      applicationsList: modelApplicationsList,
      showApplicationDetails: (applicationID) => {
        applicationModel.setCurrentApplicationID(applicationID);
        applicationModel.getChosenApplicationData(applicationID);
      },
      navToApplicationDetails: navToApplicationDetails,
    }), 
  );
}
export default RecruiterMain;
