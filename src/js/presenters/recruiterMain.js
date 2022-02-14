import React from "react";
//import useModelProp from "../useModelProp";
//import AnimeData from "../animeData";
// import usePromise from "../usePromise";
// import promiseNoData from "../views/promiseNoData";
import RecruiterFilterView from "../views/recruiterFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

function RecruiterMain({ userModel, animeModel, navToHome }) {

  // const [promise, setPromise] = React.useState(null);
  // const [data, error] = usePromise(promise);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [name, setName] = React.useState("");

  const signedIn = true;

  // React.useEffect(
  //   function () {
  //     if (currentApplication) {
  //       setPromise(ApplicationDataList.searchApplicationeById(currentApplication));
  //     }
  //   },
  //   [currentApplication]
  // );

  // React.useEffect(
  //   function () {
  //     if (signedIn) {
  //       setaddApplicationToList("Submit the application");
  //     }
  //   },
  //   [signedIn]
  // );

  return React.createElement(
    React.Fragment,
    {},
    React.createElement(RecruiterFilterView, {
      setName: name => setName(name),
      setCompetenceType: competenceType => setCompetenceType(competenceType),
      fromDate: fromDate,
      setFromDate: startDate => setFromDate(startDate), 
      toDate: toDate,
      setToDate: toDate => setToDate(toDate),
      handleAppliedFilter: () => {}, // will be replaced with the handler for the filter.
      signedIn: signedIn
    }), 
    //promiseNoData(promise, data, error) ||
    React.createElement(FilteredApplicationsView, {
      firstName: "", 
      lastName: "", 
      applicationList: "[...applicationList]", 
      showApplicationDetails: "(applicationId) => { applicationModel.setCurrentApplication(applicationModel); navToApplicationDetails(); },"
    })
  );
}
export default RecruiterMain;
