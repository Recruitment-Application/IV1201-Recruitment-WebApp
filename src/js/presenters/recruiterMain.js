import React from "react";
import useModelProp from "../useModelProp";
import RecruiterFilterView from "../views/recruiterFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

import { toast } from 'react-toastify';

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
  
  /**
   * The first render for the RecruiterFilterView which allows the recruiter filter the application according to the entered attributes. 
   * The second render is for FilteredApplicationsView which display the filtered applications.
   */
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
