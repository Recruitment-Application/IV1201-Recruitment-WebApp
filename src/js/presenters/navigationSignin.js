import React from "react";
import NavigationSigninView from '../views/navigationSigninView'

/**
 * The presenter is responisble to show the signin form.
 * The form lets the user enter the username and password.
 * @param {UserModel} userModel userModel that includes user singin data.
 * @returns {NavigationSigninView} a react element of the NavigationSigninView which lets the user to signin with username and password data.
 *                                 When the user is signed in successfully, the Navigation presenter will display the the username in the navbar. 
 */
function NavigationSignin({ userModel }) {

    const [username, setUsername] = React.useState(""); // Holds the inputed email
    const [password, setPassword] = React.useState(""); // Holds the inputed password
    const [showSignin, setShowSignin] = React.useState(false); // The Signin modal gets rendered depending on this value

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
