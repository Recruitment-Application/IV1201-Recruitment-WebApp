
import ApiData from "./apiData";

/**
 * Responsible for handling all the information about the user credentials.
 */
class UserModel {
  /**
   * Create an instance of the user handler.
   */
  constructor() {
    this.subscribers = [];
    this.loggedIn = null;
    this.username = null;
    this.role = null;
    this.errorData = null;
    this.checkSignin();
  }

  /**
   * Perform the signin process using the entered username and password by user.
   * @param {String} username The entered username by user which will be displayed later when the signin is succeeded.
   * @param {String} password The entered password by user.
   */
  signinUser(username, password) {
    ApiData.signinUser(username, password)
      .then((result) => {
        if (result.ok) {
          result.json().then((data) => {
            let userLoggedIn = true;
            let currentUsername = data.success.username;
            let currentRole = data.success.roleID;
            this.populateUserModelData({ loggedIn: userLoggedIn, username: currentUsername, role: currentRole });
          });
        } else {
          result.json().then((data) => {
            this.handleErrorMessages(result.status, data.error);
          });
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
        } else {
          this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
        }
      });
  }

  /**
   * Check if the visitor hasn't signed in yet, is still signed in on the webapp or has been signed out. 
   */
  checkSignin() {
    ApiData.checkSignin()
      .then((result) => {
        if (result.ok) {
          result.json().then((data) => {
            let userLoggedIn = true;
            let currentUsername = data.success.username;
            let currentRole = data.success.roleID;
            this.populateUserModelData({ loggedIn: userLoggedIn, username: currentUsername, role: currentRole });
          });
        }
        else {
          this.emptyUserModelData();
          this.loggedIn = false;
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
        }
      });

  }

  /**
   * Sign out the user from the webapp page. 
   */
  signoutUser() {
    ApiData.signoutUser()
      .then((result) => {
        if (result.ok) {
          result.json().then((data) => {
            this.emptyUserModelData();
            this.loggedIn = false;
          });
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
        } else {
          this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
        }
      });
  }

  /**
   * Process the registration of the new user using the passed credentials.
   * @param {String} firstName the entered firstName by user in the presented form.
   * @param {String} lastName the entered lastName by user in the presented form.
   * @param {String} personNumber the entered personNumber by user in the presented form.
   * @param {String} email the entered email by user in the presented form.
   * @param {String} username the entered username by user in the presented form.
   * @param {String} password the entered password by user in the presented form.
   */
  signupUser(firstName, lastName, personNumber, email, username, password) {
    ApiData.signupUser(firstName, lastName, personNumber, email, username, password)
      .then((result) => {
        if (result.ok) {
          result.json().then((data) => {
            let userLoggedIn = true;
            let currentUsername = data.success.username;
            let currentRole = data.success.roleID;
            this.populateUserModelData({ loggedIn: userLoggedIn, username: currentUsername, role: currentRole });
          });
        } else {
          result.json().then((data) => {
            this.handleErrorMessages(result.status, data.error);
          });
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
        } else {
          this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
        }
      });
  }


  /**
   * Notify the observers for the error encountered during some operation and pass on the error information.
   * @param {number} code The status code related to the error.
   * @param {string} message The message explanting the error.
   */
  reportError(code, message) {
    this.errorData = { code: code, message: message };
    this.notifyObservers();
  }

  /**
   * Set the user information with all their data.
   * @param {{loggedIn}} loggedIn the status of the signed in user
   * @param {{String}} username the username of the signed in user
   * @param {{number}} role the role of the signed in user (1: recruiter, 2: applicant)
   */
  populateUserModelData({ loggedIn, username, role }) {
    this.loggedIn = loggedIn;
    this.username = username;
    this.role = role;
    this.notifyObservers();
  }

  /**
   * Reset the info about the signed in user.
   */
  emptyUserModelData() {
    this.loggedIn = null;
    this.username = null;
    this.role = null;
    this.errorData = null;
    this.notifyObservers();
  }

  /**
   * Reset the info about the error that was recently encountered.
   */
  emptyErrorData() {
    this.errorData = null;
    this.notifyObservers();
  }

  /**
    * Adds an observer to the class.
    * @param {function} callback The operation that will be called when the observer is notified.
    */
  addObserver(callback) {
    this.subscribers = this.subscribers.concat(callback);
  }

  /**
   * Removes the observer from the class.
   * @param {Observer} obs The observer 
   */
  removeObserver(obs) {
    this.subscribers = this.subscribers.filter(o => { return o !== obs; });
  }

  /**
   * Notifies the observers after any changes.
   */
  notifyObservers() {
    this.subscribers.forEach(callback => {
      try {
        callback();
      }
      catch (err) {
        console.error("Callback error: ", err, callback);
      }
    });
  }

  /**
 * Handle the errors that the website encounters.
 * @param {number} status The status code related to the error.
 * @param {string | {msg, param}} error The error that happened.
 */
  handleErrorMessages(status, error) {
    if (typeof error === 'string') {
      this.reportError(status, error);
      return;
    }

    let message = '';

    error.errors.forEach((err) => {
      message = err.msg + ' for ' + err.param;
      this.reportError(status, message);
    });
  }
}

export default UserModel;