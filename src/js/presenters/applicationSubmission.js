import React from "react";
//import useModelProp from "../useModelProp";
//import AnimeData from "../animeData";
// import usePromise from "../usePromise";
// import promiseNoData from "../views/promiseNoData";
import ApplicationSubmissionView from "../views/applicationSubmissionView";

function ApplicationSubmission({ userModel, animeModel, navToHome }) {

  // const [promise, setPromise] = React.useState(null);
  // const [data, error] = usePromise(promise);
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [competenceType, setCompetenceType] = React.useState("");
  const [yearOfExperience, setYearsOfExperience] = React.useState("");

  //const competenceApplication = "";
  const signedIn = true;
  const [SubmitApplication, setaddApplicationToList] = React.useState("Signin to submit the application");

  const competenceTypesList = ["(1) ticket sales", "(2) lotteries", "(3) roller coaster operation"];
  const experienceYearsList = ["0", "1", "2", "3", "5", "10"];
  const job ="Amusemenet Park";
  const data = [];
  const applicationAlreadySubmited = false;
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
    React.createElement(ApplicationSubmissionView, {
      job: job,
      competenceType: competenceType => setCompetenceType(competenceType),
      experienceYearsList: experienceYearsList,
      yearOfExperience: yearOfExperience => setYearsOfExperience(yearOfExperience),
      competenceApplication: data,

      competenceSubmited: applicationAlreadySubmited,
      // (submitedApplication) => {
      //   if (SignedIn) {
      //     applicationModel .addSubmitedToUserProfile({
      //       competence: submitedApplication.comptenceType,
      //       yearsOfExprience: submitedApplication.yearsOfExprience,
      //       fromDate: submitedApplication.fromDate,
      //       toDate: submitedApplication.toDate
      //     });
      //     applicantModel.updateSubmissionListDB();
      //   }
      //}, 

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
