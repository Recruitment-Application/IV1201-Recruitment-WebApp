import React from "react";
//import useModelProp from "../useModelProp";
// import usePromise from "../usePromise";
// import promiseNoData from "../views/promiseNoData";
import ChosenApplicationDetailsView from "../views/chosenApplicationDetailsView";

function ChosenApplicationDetails({ userModel, applicationModel, navToApplicationsList }) {

  // const [promise, setPromise] = React.useState(null);
  // const [data, error] = usePromise(promise);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [yearOfExperience, setYearsOfExperience] = React.useState("");

  //const competenceApplication = "";
  const signedIn = true;

  const applicationData = ["Garo", "Malko", "Ticket Seller", "17/2/2022", "20/2/2022", 5, 2];
  const decisionList = ["Accepted", "Rejected", "Unhandled"];
  const applicationId = 20;


  // const [SubmitApplication, setaddApplicationToList] = React.useState("Signin to submit the application");

  // React.useEffect(
  //   function () {
  //     if (currentApplication) {
  //       setPromise(ApplicationData.searchApplicationById(currentApplication));
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
   * send the required data to render the ChosenApplicationDetailsView and return an action for the made decision by the recruiter.
   */
  return (
    //promiseNoData(promise, data, error) ||
    React.createElement(ChosenApplicationDetailsView, {
      firstName: applicationData[0], 
      lastName: applicationData[1], 
      competence: applicationData[2], 
      availableFrom: applicationData[3], 
      availableTo: applicationData[4], 
      yearsOfExperience: applicationData[5], 
      decisionList: decisionList, 
      takenDecision: applicationData[6], 
      applicationId: applicationId, 
      makeDescision: navToApplicationsList
    })
  );
}
export default ChosenApplicationDetails;
