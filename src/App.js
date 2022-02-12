import React from "react";
import Homepage from "./js/presenters/homepage";
import ShowView from "./js/presenters/viewManager"
import Navigation from "./js/presenters/navigation"
import NavigationSignup from "./js/presenters/navigationSignup"
import NavigationSignin from "./js/presenters/navigationSignin"
import NavigationSignout from "./js/presenters/navigationSignout"
import './App.css';


const goToHomePageHref = "#home";
const goToUserProfileHref = "#userProfile";

function App() {
  return (
    <div className="App">
      <Navigation userModel={null}>
        <NavigationSignin userModel={null}/>
        <NavigationSignup userModel={null}/>
        <NavigationSignout userModel={null} goToHomePageHref={goToHomePageHref} goToUserProfileHref={goToUserProfileHref} />
      </Navigation>
      <ShowView hash="#home">
        <div>
          <Homepage />
        </div>
      </ShowView>
    </div>
  );
}


function defaultRoute() {
  if (!["#home", "#userProfile"].find(knownRoute =>
    knownRoute === window.location.hash))
    window.location.hash = "#home";
}

defaultRoute();
window.addEventListener("hashchange", defaultRoute);

export default App;