import React from "react";
import useModelProp from "../useModelProp";
import NavigationSignoutView from '../views/navigationSignoutView'

/**
 * The presenter is responisble to display the username and signout button.
 * The username will take the user to userProfile, and the signout will signout the user from the homepage.
 * @param {UserModel} userModel userModel that includes signed in user data.
 * @param {Function} goToHomePageHref navigation to the homepage reference.
 * @param {Function} goToUserProfileHref navigation to the userProfile referenec.
 * @returns {NavigationSignoutView} A react element of the NavigationSignoutView which lets the user to signout and handle the signout operation.
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
