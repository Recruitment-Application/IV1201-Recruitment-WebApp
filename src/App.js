import React from "react";
import Homepage from "./js/presenters/homepage";
import ShowView from "./js/presenters/viewManager";
import Navigation from "./js/presenters/navigation";
import ApplicationSubmission from "./js/presenters/applicationSubmission";
import RecruiterMain from "./js/presenters/recruiterMain";
import ChosenApplicationDetails from "./js/presenters/chosenApplicationDetails";
import NavigationSignup from "./js/presenters/navigationSignup";
import NavigationSignin from "./js/presenters/navigationSignin";
import NavigationSignout from "./js/presenters/navigationSignout";

import './App.css';


const goToHomePageHref = "#home";
const goToUserProfileHref = "#userProfile";
const goToChooseApplicantRecruiterHref = "#applicationDetails";
const tempApplicantPageHref = "#applicantView";
const tempRecruiterPageHref = "#recruiterMain";
const goToApplicantPage = () => window.location.hash = "applicantView";
const goToRecruiter = () => window.location.hash = "recruiterMain";
const goToApplicationDetails = () => window.location.hash = "applicationDetails";

function App() {
  return (
    <div className="App">
      <Navigation userModel={null}>
        <NavigationSignin userModel={null}/>
        <NavigationSignup userModel={null}/>
        <NavigationSignout userModel={null} goToHomePageHref={goToHomePageHref} goToUserProfileHref={tempApplicantPageHref} />
      </Navigation>
      <ShowView hash="#home">
        <div>
          <Homepage />
        </div>
      </ShowView>

      <ShowView hash="#applicantView">
        <div>
          <ApplicationSubmission userModel={null} animeModel={null} navToHome={goToRecruiter} />
        </div>
      </ShowView>
      
      <ShowView hash="#recruiterMain">
        <div>
          <RecruiterMain userModel={null} animeModel={null} navToApplicationDetails={goToApplicationDetails} />
        </div>
      </ShowView>

      <ShowView hash="#applicationDetails">
        <div>
          <ChosenApplicationDetails userModel={null} animeModel={null} navToApplicationsList={goToHomePageHref} />
        </div>
      </ShowView>
    </div>
  );
}


function defaultRoute() {
  if (!["#home", "#userProfile", "#applicantView", "#recruiterMain", "#applicationDetails",].find(knownRoute =>
    knownRoute === window.location.hash))
    window.location.hash = "#home";
}

defaultRoute();
window.addEventListener("hashchange", defaultRoute);

export default App;