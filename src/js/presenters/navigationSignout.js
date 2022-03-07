import React from "react";
import useModelProp from "../useModelProp";
import NavigationSignoutView from '../views/navigationSignoutView'

/**
 * The presenter is responsible to display the username and sign out button.
 * The username will take the user to userProfile, and the sign out will sign out the user from the homepage.
 * @param {UserModel} userModel userModel that includes signed in user data.
 * @param {Function} goToHomePageHref navigation to the homepage reference.
 * @param {Function} goToUserProfileHref navigation to the userProfile reference.
 * @returns {NavigationSignoutView} A react element of the NavigationSignoutView which lets the user to sign out and handle the sign out operation.
 *  
 * */
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
