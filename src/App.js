import React from "react";
import Homepage from "./js/presenters/homepage";
import ShowView from "./js/presenters/viewManager";
import Navigation from "./js/presenters/navigation";
import ApplicationSubmission from "./js/presenters/applicationSubmission";
import RecruiterMain from "./js/presenters/recruiterMain";
import ChosenApplicationDetails from "./js/presenters/chosenApplicationDetails";
import RecruiterApplicantPresenter from "./js/presenters/recruiterApplicantPresenter";
import NavigationSignup from "./js/presenters/navigationSignup";
import NavigationSignin from "./js/presenters/navigationSignin";
import NavigationSignout from "./js/presenters/navigationSignout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import './App.css';


const goToHomePageHref = "#home";
const userViewPageHref = "#userView";
const goToUserView = () => window.location.hash = "userView";
const goToApplicationDetails = () => window.location.hash = "applicationDetails";

/**
 * 
 * @param {*} param0 
 * @returns div of the specified views according to the entered hash. 
 */
function App({userModel, applicationModel}) {
  return (
    <div className="App">
      <Navigation userModel={userModel} applicationModel={applicationModel}>
        <NavigationSignin userModel={userModel}/>
        <NavigationSignup userModel={userModel}/>
        <NavigationSignout userModel={userModel} goToHomePageHref={goToHomePageHref} goToUserProfileHref={userViewPageHref} />
      </Navigation>
      <ShowView hash="#home">
        <div>
          <Homepage />
        </div>
      </ShowView>

      <ShowView hash="#userView">
        <div>
         <RecruiterApplicantPresenter userModel={userModel} applicationModel={applicationModel} navToApplicationDetails ={goToApplicationDetails}/>
        </div>
      </ShowView>

      <ShowView hash="#applicationDetails">
        <div>
          <ChosenApplicationDetails userModel={userModel} applicationModel={applicationModel} navToApplicationsList={goToUserView} />
        </div>
      </ShowView>
      <ToastContainer />
    </div>
  );
}


/**
 * when the route isn't one of the hashes listed in the if statement, or if the hash changed to uneligiable hash, 
 * the defaultRoute() will change it back to #home
 */
function defaultRoute() {
  if (!["#home", "#applicationDetails","#userView",].find(knownRoute =>
    knownRoute === window.location.hash))
    window.location.hash = "#home";
}

defaultRoute();
window.addEventListener("hashchange", defaultRoute);

export default App;