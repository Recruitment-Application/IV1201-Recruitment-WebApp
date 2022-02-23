
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

    ApiData.signinUser(username, password).then((result) => {
      if (result.ok) {
        result.json().then((data) => {
          let userLoggedIn = true;
          let currentUsername = data.success.username;
          let currentRole = data.success.roleID;
          this.populateUserModelData({loggedIn: userLoggedIn, username: currentUsername, role: currentRole});
        });
      }
    });

  }

  /**
   * Check if the user is signedin or not. If the user is eligable to be stay signedin, it will return the username and roleID. 
   * Fill the userModel with the user data.
   * If the user is signedout, the user's data will be cleared usign emptyUserModelData() and change the status of loggedIn to false.
   */
  checkSignin() {
    ApiData.checkSignin().then((result) => {
      if (result.ok) {
        result.json().then((data) => {
          let userLoggedIn = true;
          let currentUsername = data.success.username;
          let currentRole = data.success.roleID;
          this.populateUserModelData({loggedIn: userLoggedIn, username: currentUsername, role: currentRole});
        });
      }
      else {
        this.emptyUserModelData();
        this.loggedIn = false;
      }
    });

  }

  /**
   * Signout the user from the webapp page. 
   * When the signout is successful, the function will empty the userModel data and change the loggedIn status to false.
   */
  signoutUser(){
    ApiData.signoutUser().then((result) => {
      if (result.ok) {
        result.json().then((data) => {
          this.emptyUserModelData();
          this.loggedIn = false;
        });
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
    ApiData.signupUser(firstName, lastName, personNumber, email, username, password).then((result) => {
      if (result.ok) {
        result.json().then((data) => {
          let userLoggedIn = true;
          let currentUsername = data.success.username;
          let currentRole = data.success.roleID;
          this.populateUserModelData({loggedIn: userLoggedIn, username: currentUsername, role: currentRole});
        });
      }
    });

  }


  // Reports an error and notify the observers.
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
   * empties the errorData and set its value to null, and then notify the observers.
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
    this.printModel();
    this.subscribers.forEach(callback => {
      try {
        callback();
      }
      catch (err) {
        console.error("Callback error: ", err, callback);
      }
    });
  }


}

export default UserModel;