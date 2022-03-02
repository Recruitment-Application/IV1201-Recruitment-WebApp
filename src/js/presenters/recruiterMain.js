import React from "react";
import useModelProp from "../useModelProp";
import RecruiterFilterView from "../views/recruiterFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

function RecruiterMain({ userModel, applicationModel, navToApplicationDetails }) {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [name, setName] = React.useState("");
  const [chosenCompetence, setChosenCompetence] = React.useState("");


  let competenceType = useModelProp(applicationModel, "competenceList");
  let modelRoleId = useModelProp(userModel, "role");
  let filledDataOnceInList = useModelProp(applicationModel, "filledDataOnce");
  let modelApplicationsList = useModelProp(applicationModel, "applicationsList");
  let pageNum = 0;
  
  React.useEffect(
    function () {
      if (modelRoleId == 1 && filledDataOnceInList == false) {
        applicationModel.getJobs();
      }
    },
    [modelRoleId]
  );


  const signedIn = true;

  //const applicationsList = useModelProp(applicationModel, "applications");

  // React.useEffect(
  //   function () {
  //     if (applicationsList === []) {
  //       setPromise(setApplicationsList(applicationModel.getApplicationsList()));
  //     }
  //   },
  //   [applicationsList]
  // );



  // React.useEffect(
  //   function () {
  //     if (signedIn) {
  //       setaddApplicationToList("Submit the application");
  //     }
  //   },
  //   [signedIn]
  // );


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
        //setPromise(applicationModel.getApplicationsList());
        applicationModel.filterDateInApplicationAndForwardToApiData(name, chosenCompetence, fromDate, toDate, pageNum);
      }, // will be replaced with the handler for the filter.
      signedIn: signedIn
    }),
    modelApplicationsList &&
    React.createElement(FilteredApplicationsView, {
      applicationsList: modelApplicationsList,
      showApplicationDetails: (applicationID) => {
        applicationModel.setCurrentApplicationID(applicationID);
        navToApplicationDetails();
      }
    }), 
  );
}
export default RecruiterMain;
