import React from "react";
import NavigationSignupView from '../views/navigationSignupView'

/**
 * The presenter is responsible to signup new users and signin them to the webapp after the successful registration. 
 * @param {UserModel} userModel userModel which the function that register the new user.
 * @returns {NavigationSignupView} NavigationSignupView that contains a signup form that holds the entered data using different react stated 
 *                                 and being updated when the user enters new data. 
 *                                 By pressing the Signup button, the entered data will be passed to a function in the userModel to register the new user to the database.
 */
function NavigationSignup({ userModel }) {

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [personNumber, setPeronNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showSignup, setShowSignup] = React.useState(false);

    return React.createElement(NavigationSignupView, {
        setFirstName: (firstName) => setFirstName(firstName),
        setLastName: (lastName) => setLastName(lastName),
        setPeronNumber: (personNumber) => setPeronNumber(personNumber),
        setEmail: (email) => setEmail(email),
        setUsername: (username) => setUsername(username),
        setPassword: (password) => setPassword(password),
        handleSignup: () => userModel.signupUser(firstName, lastName, personNumber, email, username, password) , // will be uncommented when the usermodel is finished.
        show: showSignup,
        handleShow: () => setShowSignup(true),
        handleClose: () => setShowSignup(false)
    });
}

export default NavigationSignup;
