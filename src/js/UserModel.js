
import ApiData from "./apiData";

/**
 * the UserModel class calls function in ApiData file that contaisn the apiCalls. 
 */
class UserModel {
  /**
   * the constructor of the UserModel that declares the global variables. 
   * At the end, it calls the checkSignin() to keep the latest eligiable signedin user to the webapp.
   */
  constructor() {
    this.subscribers = [];
    this.loggedIn = null;
    this.username = null;
    this.role = null;
    this.errorData = null;
    this.checkSignin();
  }

  // Performs login to existing account and fills the userModel with the user data.
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
   * Check if the user is signedin or not. If the user is eligable to be stay signedin, it will return the username and roleID. 
   * Fill the userModel with the user data.
   * If the user is signedout, the user's data will be cleared usign emptyUserModelData() and change the status of loggedIn to false.
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
   * Signout the user from the webapp page. 
   * When the signout is successful, the function will empty the userModel data and change the loggedIn status to false.
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
   * signupUser function calls the signupUser() in the ApiData and passes the entered data by presenter,
   * If the result if ok, the userModel data will be filled with the username and roleID, and change the userLoggedIn to true.
   * @param {*} firstName the entered firstName by user
   * @param {*} lastName the entered lastName by user
   * @param {*} personNumber the entered personNumber by user
   * @param {*} email the entered email by user
   * @param {*} username the entered username by user
   * @param {*} password the entered password by user
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
   * fill the userData with the passed data of loggedIn, username and role.
   * @param {*} param0 
   */
  populateUserModelData({ loggedIn, username, role }) {
    this.loggedIn = loggedIn;
    this.username = username;
    this.role = role;
    this.notifyObservers();
  }

  /**
   * empties the userModelData and set its values to null, then notify the observers.
   */
  emptyUserModelData() {
    this.loggedIn = null;
    this.username = null;
    this.role = null;
    this.errorData = null;
    this.notifyObservers();
  }

  /**
   * Reset the info about the error that was recently encountered and notify the observers.
   */
  emptyErrorData() {
    this.errorData = null;
    this.notifyObservers();
  }

  // Adds an observer to the userModel.
  addObserver(callback) {
    this.subscribers = this.subscribers.concat(callback);
  }

  // Removes the observer from the userModel.
  removeObserver(obs) {
    this.subscribers = this.subscribers.filter(o => { return o !== obs; });
  }

  /**
   * prints the loggedIn status, username and roleID in the browser's console.
   */
  printModel() {
    console.log(`loggedIn: ${this.loggedIn}`);
    console.log(`username: ${this.username}`);
    console.log(`role: ${this.role}`);

  }

  // Notifies the obvservers after any changes.
  notifyObservers() {
    //this.printModel();
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