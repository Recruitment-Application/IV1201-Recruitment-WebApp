import React from "react";
import NavigationSigninView from '../views/navigationSigninView'

/**
 * Render the navigationSigninview
 * @param {*} param0 userModel is passed to the presenter
 * @returns the entered data by user
 */
function NavigationSignin({ userModel }) {

    const [username, setUsername] = React.useState(""); // Holds the inputed email
    const [password, setPassword] = React.useState(""); // Holds the inputed password
    const [showSignin, setShowSignin] = React.useState(false); // The Signin modal gets rendered depending on this value


    /**
     * render the NavigationSigninView where the username and password are send by the user. 
     * Calling signinUser function in the userModel to process the signin with the entered credentials.
     */
    return React.createElement(NavigationSigninView, {
        setUsername: (username) => setUsername(username),
        setPassword: (password) => setPassword(password),
        handleSignin: () => userModel.signinUser(username, password),
        show: showSignin,
        handleShow: () => setShowSignin(true),
        handleClose: () => setShowSignin(false)
    });
}

export default NavigationSignin;
