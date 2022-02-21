import React from "react";
import useModelProp from "../useModelProp";
import NavigationSignoutView from '../views/navigationSignoutView'

/**
 * Render the Navigation SignoutView
 * @param {*} param0 userModel which contains the necessary data
 * @returns return the clicked homePage or userprofile reference 
 */
function NavigationSignout({ userModel, goToHomePageHref, goToUserProfileHref }) {

    const modelUsername = useModelProp(userModel, "username");

    return React.createElement(NavigationSignoutView, {
        username: modelUsername,
        handleSignout: () => userModel.signoutUser(),
        navHomePageHref: goToHomePageHref,
        navUserProfileHref: goToUserProfileHref
    });
}

export default NavigationSignout;
