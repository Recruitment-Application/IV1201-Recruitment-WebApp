import BASE_URL from "./apiConfig";

class UserModel {
  constructor() {
    this.subscribers = [];
    this.loggedIn = null;
    this.uid = null;
    this.email = null;
    this.dbref = null;
    this.errorData = null;

  }
  apiCall(urlPath, requestContent) {
    const fetchData = fetch(BASE_URL + urlPath, requestContent)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("HTTP CODE NOT 200");
      });;
    console.log(fetchData);
    return fetchData

  }

  // Performs login to existing account and fills the userModel with the user data.
  signinUser(username, password) {

    return this.apiCall(
      'user/signin',
      {
        'method': 'POST',
        'body': {
          'Content-Type': 'application/json',
          'text': '{\n\t\'username\': ' + username + ' ,\n\t\'password\': ' + password + '\n}'
        }
      })
      .then((response) => {
        return response;
      });

  }

  homePageHandler() {
    return this.apiCall(
      '',
      {
        "method": "GET"
      })
      .then((response) => {
        return response;
      });
  }

  // Reports an error and notify the observers.
  reportError(code, message) {
    this.errorData = { code: code, message: message };
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

  // Notifies the obvservers after any changes.
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


}

export default UserModel;