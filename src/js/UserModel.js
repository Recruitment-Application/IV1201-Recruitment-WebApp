
import ApiData from "./apiData";

class UserModel {
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


  // Reports an error and notify the observers.
  reportError(code, message) {
    this.errorData = { code: code, message: message };
    this.notifyObservers();
  }

  populateUserModelData({ loggedIn, username, role }) {
    this.loggedIn = loggedIn;
    this.username = username;
    this.role = role;
    this.notifyObservers();
  }

  emptyUserModelData() {
    this.loggedIn = null;
    this.username = null;
    this.role = null;
    this.errorData = null;
    this.notifyObservers();
  }

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

  printModel() {
    console.log(`loggedIn: ${this.loggedIn}`);
    console.log(`username: ${this.username}`);
    console.log(`role: ${this.role}`);

  }


  // Notifies the obvservers after any changes.
  notifyObservers() {
    // this.printModel();
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