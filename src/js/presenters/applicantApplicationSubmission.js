import React from "react";
//import useModelProp from "../useModelProp";
//import AnimeData from "../animeData";
// import usePromise from "../usePromise";
// import promiseNoData from "../views/promiseNoData";
import ApplicantApplicationSubmissionView from "../views/applicantApplicationSubmissionView";

function ApplicantApplicationSubmission({ userModel, animeModel, navToHome }) {

  // const [promise, setPromise] = React.useState(null);
  // const [data, error] = usePromise(promise);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [yearOfExperience, setYearsOfExperience] = React.useState("");

  //const competenceApplication = "";
  const signedIn = true;
  const [SubmitApplication, setaddApplicationToList] = React.useState("Signin to submit the application");

  // React.useEffect(
  //   function () {
  //     if (currentAnime) {
  //       setPromise(AnimeData.searchAnimeById(currentAnime));
  //     }
  //   },
  //   [currentAnime]
  // );

  React.useEffect(
    function () {
      if (signedIn) {
        setaddApplicationToList("Submit the application");
      }
    },
    [signedIn]
  );

  return (
    //promiseNoData(promise, data, error) ||
    React.createElement(ApplicantApplicationSubmissionView, {
      competenceType: competenceType => setCompetenceType(competenceType),
      yearOfExperience: yearOfExperience => setYearsOfExperience(yearOfExperience),
      competenceApplication: "data",
      
      competenceSubmited: "true",
      // (submitedApplication) => {
      //   if (SignedIn) {
      //     applicationModel.addSubmitedToUserProfile({
      //       competence: submitedApplication.comptenceType,
      //       yearsOfExprience: submitedApplication.yearsOfExprience,
      //       fromDate: submitedApplication.fromDate,
      //       toDate: submitedApplication.toDate
      //     });
      //     applicantModel.updateSubmissionListDB();
      //   }
      //}, 
      
      isCompetenceAlreadySubmited: false,
      // //applicationsList.find((listApplications) => listApplication.id === currentCompetence) !== undefined, 
      fromDate: fromDate,
      setFromDate: startDate => setFromDate(startDate), 
      toDate: toDate,
      setToDate: toDate => setToDate(toDate),

      SubmitApplicationText: SubmitApplication,
      SubmitApplicationNav: navToHome, 

      cancelBackToMainNav: navToHome,
      signedIn: signedIn
    })
  );
}
export default ApplicantApplicationSubmission;
