import React from "react";
import useModelProp from "../useModelProp";
import usePromise from "../usePromise";
import promiseNoData from "../views/promiseNoData";
import ApplicationSubmissionView from "../views/applicationSubmissionView";

function ApplicationSubmission({ userModel, applicationModel, navToHome }) {

  //const currentUser = useModelProp(userModel, "currentUser");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [yearOfExperience, setYearsOfExperience] = React.useState("");
  const [promise, setPromise] = React.useState(null);
  const [data, error] = usePromise(promise);

  
  const signedIn = true;
  const [SubmitApplication, setaddApplicationToList] = React.useState("Signin to submit the application");

  const competenceTypesList = ["(1) ticket sales", "(2) lotteries", "(3) roller coaster operation"];
  const experienceYearsList = ["0", "1", "2", "3", "5", "10"];
  const tempJob ="Amusemenet Park";
  const applicationAlreadySubmited = false;

  /**
   * check if the user is signedin, Set the submit button name to "Submit the application".
   */
  React.useEffect(
    function () {
      if (signedIn) {
        setaddApplicationToList("Submit the application");
      }
    },
    [signedIn]
  );
  

  /**
   * render the applicationSubmissionView with the sent data, and return the action of submitting the application.
   */
  return (
    promiseNoData(promise, data, error) ||
    React.createElement(ApplicationSubmissionView, {
     job: tempJob,
      competenceType: competenceType => setCompetenceType(competenceType),
      experienceYearsList: experienceYearsList,
      yearOfExperience: yearOfExperience => setYearsOfExperience(yearOfExperience),
      competenceApplication: "data",

      competenceSubmited: applicationAlreadySubmited,

      isCompetenceAlreadySubmited: applicationAlreadySubmited,
      // //applicationsList.find((listApplications) => listApplication.id === currentCompetence) !== undefined, 
      fromDate: fromDate,
      setFromDate: startDate => setFromDate(startDate),
      toDate: toDate,
      setToDate: toDate => setToDate(toDate),
      competenceTypesList: competenceTypesList,
      SubmitApplicationText: SubmitApplication,
      SubmitApplicationNav: navToHome,
      signedIn: signedIn
    })
  );
}
export default ApplicationSubmission;
