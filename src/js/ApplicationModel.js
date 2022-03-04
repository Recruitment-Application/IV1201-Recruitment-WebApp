
import ApiData from "./apiData";

class ApplicationModel {
    constructor() {
        this.subscribers = [];
        this.competenceList = [];
        this.job = {
            jobID: null,
            jobDescription: null,
            competenceList: this.competenceList,
        };
        this.jobList = [];
        this.applicationsList = [];
        this.errorData = null;
        this.filledDataOnce = false;
        this.currentApplicationID = null;
        this.latestSubmittedApplicationID = null;
        this.chosenApplicationData = null;
        this.latestApplicationDecision = null;
    }

    // Performs login to existing account and fills the userModel with the user data.
    getJobs() {
        ApiData.getJobs()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateJobData(dataContent);
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

    // 
    getCompetenceList() {
        return this.competenceList; // will this be called and list the jobs as well, or just the competenceList for one job ?
    }

    filterApplications(name, competenceId, dateFrom, dateTo, pageNum) {
        ApiData.listApplications(name, competenceId, dateFrom, dateTo, pageNum)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateApplicationsData(dataContent);
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


    getChosenApplicationData(applicationId) {
        ApiData.getApplicationDetails(applicationId)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateChosenApplicationData(dataContent);
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

    updateApplicationDecision(applicationId, decision) {
        ApiData.submitApplicationDecision(applicationId, decision)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateTakenDecisionData(dataContent);
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

    filterUnFilteredApplicationsData(unfilteredName, unfilteredCompetenceId, unfilterdDateFrom, unfilterdDateTo, unfilteredPageNum) {
        let dateFrom = "";
        let dateTo = "";
        let name = "";
        let competenceId = 0;
        if (unfilterdDateFrom !== "" && unfilterdDateFrom !== undefined && unfilterdDateFrom !== null) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateFrom = unfilterdDateFrom.toLocaleDateString('sv-SE', options);
        }
        if (unfilterdDateTo !== "" && unfilterdDateTo !== undefined && unfilterdDateTo !== null) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateTo = unfilterdDateTo.toLocaleDateString('sv-SE', options);
        }
        if (unfilteredName !== "") {
            name = unfilteredName;
        }
        if (unfilteredCompetenceId !== "") {
            competenceId = unfilteredCompetenceId;
        }
        //unfilteredPageNum should be handled (can be 0, 1, 2, etc.) from user/default


        this.filterApplications(name, competenceId, dateFrom, dateTo, unfilteredPageNum);

    }


    submitApplication(competenceId, yearsOfExperience, dateFrom, dateTo) {
        ApiData.submitApplication(competenceId, yearsOfExperience, dateFrom, dateTo)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateSubmittedApplicationData(dataContent);
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


    filterSubmittedApplicationData(unfilteredCompetenceID, unfilteredYearsOfExperience, unfilterdDateFrom, unfilterdDateTo) {
        let dateFrom = "";
        let dateTo = "";
        let competenceId = 0;
        let yearsOfExperience = 0;
        if (unfilterdDateFrom !== "" && unfilterdDateFrom !== undefined) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateFrom = unfilterdDateFrom.toLocaleDateString('sv-SE', options);
        }
        if (unfilterdDateTo !== "" && unfilterdDateTo !== undefined) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateTo = unfilterdDateTo.toLocaleDateString('sv-SE', options);
        }
        if (unfilteredCompetenceID !== "") {
            competenceId = parseInt(unfilteredCompetenceID);
        }
        if (unfilteredYearsOfExperience !== "") {
            yearsOfExperience = parseInt(unfilteredYearsOfExperience);
        }
        //unfilteredPageNum should be handled (can be 0, 1, 2, etc.) from user/default

        this.submitApplication(competenceId, yearsOfExperience, dateFrom, dateTo);

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
    populateJobData(dataContent) {
        if (!this.filledDataOnce) {


            for (let i = 0; i < dataContent.length; i++) {

                for (let j = 0; j < dataContent[i].competences.length; j++) {
                    let competence = {
                        competenceId: dataContent[i].competences[j].id,
                        competenceType: dataContent[i].competences[j].type,
                    }
                    this.competenceList = [competence, ...this.competenceList];
                }

                this.job = {
                    jobID: dataContent[i].jobID,
                    description: dataContent[i].description,
                    competenceList: this.competenceList
                }

                this.jobList = [this.job, ...this.jobList];
            }
            this.filledDataOnce = true;
        }
        this.notifyObservers();
    }

    populateApplicationsData(filteredApplications) {
        let applications = filteredApplications.applications;
        this.applicationsList = applications;

        this.notifyObservers();
    }

    populateChosenApplicationData(applicationDetails) {
        let chosenApplicationData = {
            applicationID: applicationDetails.applicationID,
            firstName: applicationDetails.firstName,
            lastName: applicationDetails.lastName,
            competenceType: applicationDetails.competence.type,
            yearsOfExperience: applicationDetails.yearsOfExperience,
            dateFrom: applicationDetails.dateFrom,
            dateTo: applicationDetails.dateTo,
            decision: applicationDetails.decision,

        }

        this.chosenApplicationData = chosenApplicationData;
        this.notifyObservers();
    }

    returnChosenApplicationDetails() {
        return this.chosenApplicationData;
    }

    populateSubmittedApplicationData(dataContent) {
        this.latestSubmittedApplicationID = dataContent.applicationID;
        this.notifyObservers();
    }

    getSubmittedApplicationID() {
        return this.latestSubmittedApplicationID;
    }

    getApplicationsList() {
        return this.applicationsList;
    }


    setCurrentApplicationID(applicationID) {
        this.currentApplicationID = applicationID;
        this.notifyObservers();
    }

    getCurrentApplicationID() {
        return this.currentApplicationID;
    }

    populateTakenDecisionData(dataContent) {
        this.latestApplicationDecision = dataContent.decision;
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

    emptySubmittedApplicationID() {
        this.latestSubmittedApplicationID = null;
        this.notifyObservers();
    }

    emptyChosenApplicationData() {
        this.chosenApplicationData = null;
        this.latestApplicationDecision = null;
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

export default ApplicationModel;