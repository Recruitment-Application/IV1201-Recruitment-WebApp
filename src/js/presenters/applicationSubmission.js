import React from "react";
import useModelProp from "../useModelProp";
import ApplicationSubmissionView from "../views/applicationSubmissionView";
import { toast } from 'react-toastify';

function ApplicationSubmission({ userModel, applicationModel, navToHome }) {

  //const currentUser = useModelProp(userModel, "currentUser");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");

  const signedIn = true;
  const [submitApplication, setaddApplicationToList] = React.useState("Signin to submit the application");

  let competenceTypesList = useModelProp(applicationModel, "competenceList");
  let job = useModelProp(applicationModel, "job");
  let applicationID = useModelProp(applicationModel, "latestSubmitedApplicationID");

  const experienceYearsList = ["0", "1", "2", "3", "5", "10"];


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


  if(applicationID) {
    let message = `Your application has been successfully registered with application ID: ${applicationID}`; 
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored"
    });
    applicationModel.emptySubmitedApplicationID();
  }


  /**
   * render the applicationSubmissionView with the sent data, and return the action of submitting the application.
   */
  return (
    //promiseNoData(promise, data, error) ||
    React.createElement(ApplicationSubmissionView, {
      job: job,
      competenceTypesList: competenceTypesList,
      setCompetenceType: competenceType => setCompetenceType(competenceType),
      experienceYearsList: experienceYearsList,
      setYearsOfExperience: yearsOfExperience => setYearsOfExperience(yearsOfExperience),
      fromDate: fromDate,
      setFromDate: startDate => setFromDate(startDate),
      toDate: toDate,
      setToDate: endDate => setToDate(endDate),
      submitApplicationText: submitApplication,
      submitApplication: () => {
        applicationModel.filterDateInApplicationSubmissionAndForwardToApiData(competenceType, yearsOfExperience, fromDate, toDate);
      },

    })
  );
}
export default ApplicationSubmission;
