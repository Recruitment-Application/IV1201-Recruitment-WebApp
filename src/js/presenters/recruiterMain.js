import React from "react";
import useModelProp from "../useModelProp";
//import ApplicationData from "../applicationData";
// import usePromise from "../usePromise";
// import promiseNoData from "../views/promiseNoData";
import RecruiterFilterView from "../views/recruiterFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

function RecruiterMain({ userModel, applicationModel, navToApplicationDetails }) {

  // const [promise, setPromise] = React.useState(null);
  // const [data, error] = usePromise(promise);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [name, setName] = React.useState("");

  //const modelRoleId = userModel.
  //applicationModel
  // console.log(useModelProp(applicationModel, "jobID"));
  // applicationModel.getJobs();
  // console.log(applicationModel);
  const jobs = applicationModel.getJobs();
  console.log(useModelProp(applicationModel, "competences"));
  //console.log(competenceTypesList2);
  
  const competenceTypesList = ["(1) ticket sales", "(2) lotteries", "(3) roller coaster operation"];
  // console.log(competenceTypesList2);
  // console.log(competenceTypesList);
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


  /**
   * The first render for the RecruiterFilterView which allows the recruiter filter the application according to the entered attributes. 
   * The second render is for FilteredApplicationsView which display the filtered applications.
   */
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
