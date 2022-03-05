import React from "react";
import useModelProp from "../useModelProp";
import ApplicationSubmissionView from "../views/applicationSubmissionView";
import { toast } from 'react-toastify';

/**
 * The presenter of the View (applicationSubmissionView) which render the form of the application and 
 * lets the applicant submit a new application with new data.
 * The function shows a toast with the application ID(notification) to the user when the applications is successfully registered in the database.
 * The function accessed only when the signed in user is an applicant.
 * 
 * @param {Object} applicationModel from the "RecruiterApplicantPresenter" 
 * which includes data about the filtered applications and other data for other presenters.
 * 
 * @returns {ApplicationSubmissionView} A React element helps the user to enter the data of the submitted application.
 */
function ApplicationSubmission({ applicationModel }) {

  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");
  const experienceYearsList = ["0", "1", "2", "3", "5", "10"];

  let submitApplication = "Submit the application";
  let competenceTypesList = useModelProp(applicationModel, "competenceList");
  let job = useModelProp(applicationModel, "job");
  let applicationID = useModelProp(applicationModel, "latestSubmittedApplicationID");

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
    applicationModel.emptySubmittedApplicationID();
  }

  return (
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
        applicationModel.filterSubmittedApplicationData(competenceType, yearsOfExperience, fromDate, toDate);
      },

    })
  );
}
export default ApplicationSubmission;
