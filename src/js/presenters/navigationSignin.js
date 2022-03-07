import React from "react";
import NavigationSigninView from '../views/navigationSigninView'

/**
 * The presenter is responsible to show the sign in form.
 * The form lets the user enter the username and password.
 * @param {UserModel} userModel userModel that includes user sing in data.
 * @returns {NavigationSigninView} a react element of the NavigationSigninView which lets the user to sign in with username and password data.
 *                                 When the user is signed in successfully, the Navigation presenter will display the the username in the navbar. 
 */
function NavigationSignin({ userModel }) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showSignin, setShowSignin] = React.useState(false);

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
