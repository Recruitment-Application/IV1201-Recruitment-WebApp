import React from "react";
//import useModelProp from "../useModelProp";
//import AnimeData from "../animeData";
// import usePromise from "../usePromise";
// import promiseNoData from "../views/promiseNoData";
import RecruiterFilterView from "../views/recruiterFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

function RecruiterMain({ userModel, animeModel, navToApplicationDetails }) {

  // const [promise, setPromise] = React.useState(null);
  // const [data, error] = usePromise(promise);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [name, setName] = React.useState("");

  const competenceTypesList = ["(1) ticket sales", "(2) lotteries", "(3) roller coaster operation"];
  const signedIn = true;

  const applicationsList = [
    { id: 1, fName: 'Garo', lName: 'Malko' },
    { id: 2, fName: 'Gleano', lName: 'Malke' },
    { id: 3, fName: 'Simon', lName: 'Bnyo' }
];

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
      competenceTypesList: competenceTypesList,
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
      applicationsList: applicationsList,
      // "[...applicationList]", 
      showApplicationDetails: navToApplicationDetails
                              //"(applicationId) => { applicationModel.setCurrentApplication(applicationModel); navToApplicationDetails(); },"
    })
  );
}
export default RecruiterMain;
