import React from "react";
import NavigationSignupView from '../views/navigationSignupView'

/**
 * Render the Navigation SignupView
 * @param {*} param0 userModel which contains necessary data
 * @returns returns the entered Signup Data by user
 */
function NavigationSignup({ userModel }) { // userModel will be passed as param here


    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [personNumber, setPeronNumber] = React.useState("");
    const [email, setEmail] = React.useState(""); // Holds the inputed email
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState(""); // Holds the inputed password
    const [showSignup, setShowSignup] = React.useState(false); // The Signup modal gets rendered depending on this value

    /**
     * render the NavigationSignupView and pass the entered data by the user to the signupUser(). 
     */
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
