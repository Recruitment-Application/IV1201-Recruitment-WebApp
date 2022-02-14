import React from "react";
import Homepage from "./js/presenters/homepage";
import ShowView from "./js/presenters/viewManager";
import Navigation from "./js/presenters/navigation";
import ApplicantApplicationSubmission from "./js/presenters/applicantApplicationSubmission";
import RecruiterMain from "./js/presenters/recruiterMain";
import NavigationSignup from "./js/presenters/navigationSignup";
import NavigationSignin from "./js/presenters/navigationSignin";
import NavigationSignout from "./js/presenters/navigationSignout";

import './App.css';


const goToHomePageHref = "#home";
const goToUserProfileHref = "#userProfile";
const goToChooseApplicantRecruiterHref = "#applicRecruiter";
const tempApplicantPageHref = "#applicantView";
const tempRecruiterPageHref = "#recruiterMain";
const goToApplicantPage = () => window.location.hash = "applicantView";
const goToRecruiter = () => window.location.hash = "recruiterMain";

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
          <ApplicantApplicationSubmission userModel={null} animeModel={null} navToHome={goToRecruiter} />
        </div>
      </ShowView>
      
      <ShowView hash="#recruiterMain">
        <div>
          <RecruiterMain userModel={null} animeModel={null} navToSearch={goToApplicantPage} />
        </div>
      </ShowView>
    </div>
  );
}


function defaultRoute() {
  if (!["#home", "#userProfile", "#applicantView", "#recruiterMain",].find(knownRoute =>
    knownRoute === window.location.hash))
    window.location.hash = "#home";
}

defaultRoute();
window.addEventListener("hashchange", defaultRoute);

export default App;