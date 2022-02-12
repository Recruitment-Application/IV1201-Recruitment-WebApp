import React from "react";
//import useModelProp from "../useModelProp";
import NavigationSignoutView from '../views/navigationSignoutView'

/**
 * Render the Navigation SignoutView
 * @param {*} param0 userModel which contains the necessary data
 * @returns return the clicked homePage or userprofile reference 
 */
function NavigationSignout({ userModel, goToHomePageHref, goToUserProfileHref, }) {

    const username = "test";//will be imported from the db/useModelProp

    return React.createElement(NavigationSignoutView, {
        username: username,
        handleSignout: () => "userModel.logoutUser()",
        navHomePageHref: goToHomePageHref,
        navUserProfileHref: goToUserProfileHref
    });
}

export default NavigationSignout;
