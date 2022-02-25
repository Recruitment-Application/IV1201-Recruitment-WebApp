
import ApiData from "./apiData";

/**
 * the UserModel class calls function in ApiData file that contaisn the apiCalls. 
 */
class ApplicationModel {

    /**
     * the constructor of the UserModel that declares the global variables. 
     * At the end, it calls the checkSignin() to keep the latest eligiable signedin user to the webapp.
     */
    constructor() {
        this.subscribers = [];
        this.jobID = null;
        this.jobDescription = null;
        this.competenceList = [];
        this.applicationsList = null;
        this.errorData = null;
    }


    // Performs login to existing account and fills the userModel with the user data.
    getJobs() {
        ApiData.getJobs().then((result) => {
            if (result.ok) {
                result.json().then((data) => {
                    let jobID = data.success.jobID;
                    let description = data.success.description;
                    let competenceObjects = data.success.competences;
                    
                    this.populateJobCompetenceData({ jobID: jobID, description: description, competenceList: competenceObjects });
                });
            }
        });

    }

    // filterCompetenceObjectsList(competenceObjects) {
    //     competenceObjects.forEach(callback => {
    //         try {
    //             callback();
    //         }
    //         catch (err) {
    //             console.error("Callback error: ", err, callback);
    //         }
    //     });
    // }

    // Reports an error and notify the observers.
    reportError(code, message) {
        this.errorData = { code: code, message: message };
        this.notifyObservers();
    }

    /**
     * fill the userData with the passed data of loggedIn, username and role.
     * @param {*} param0 
     */
     populateJobCompetenceData({ jobID, description, competenceList }) {
        this.jobID = jobID;
        this.description = description;
        this.competenceList = competenceList;
        this.notifyObservers();
    }

    /**
     * empties the userModelData and set its values to null, then notify the observers.
     */
    // emptyUserModelData() {
    //     this.loggedIn = null;
    //     this.username = null;
    //     this.role = null;
    //     this.errorData = null;
    //     this.notifyObservers();
    // }

    /**
     * empties the errorData and set its value to null, and then notify the observers.
     */
    // emptyErrorData() {
    //     this.errorData = null;
    //     this.notifyObservers();
    // }

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
    //   printModel() {
    //     console.log(`loggedIn: ${this.loggedIn}`);
    //     console.log(`username: ${this.username}`);
    //     console.log(`role: ${this.role}`);

    //   }


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

export default ApplicationModel;