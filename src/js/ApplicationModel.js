import ApiData from "./apiData";

/**
 * Responsible for handling all the information about the applications.
 */
class ApplicationModel {
    /**
     * Create an instance of the application handler.
     */
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

    /**
     * Get the jobs and their info and store them into an attribute.
     */
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

    /**
     * Get all the application that follow the filtering parameters. The user must be a recruiter.
     * @param {string} name The name of the applicant that the application relates to.
     *                      Leaving it empty means no filtering with name.
     * @param {number} competenceId The competence that is related to the application filtering.
     *                              Leaving it with 0 value means no filtering with competence.
     * @param {string} dateFrom The start date that the user is available.
     *                          Leaving it empty means no filtering with dateFrom.
     * @param {string} dateTo The end date that the user is available.
     *                        Leaving it empty means no filtering with dateTo.
     * @param {number} pageNum The page that the list is needed to get.
     *                          Leaving it with 0 value means all the applications.
     */
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

    /**
     * Get all the information related to the specified application.
     * @param {number} applicationId The id related to the application.
     */
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

    /**
     * Submit the decision taken about an application. The user must be a recruiter.
     * @param {number} applicationId The id of the application that the decision is related to.
     * @param {string} decision The decision taken about the application.
     */
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

    /**
     * Filter out the info of the passed data to match a specific format for listing out the applications.
     * @param {string} unfilteredName The unfiltered name that could be empty.
     * @param {number} unfilteredCompetenceId The id of the competence that could be empty.
     * @param {string} unfilteredDateFrom The start date of the user availability that could be empty.
     * @param {string} unfilteredDateTo The end date of the user availability that could be empty.
     * @param {number} unfilteredPageNum The page number that could be empty.
     */
    filterUnFilteredApplicationsData(unfilteredName, unfilteredCompetenceId, unfilteredDateFrom, unfilteredDateTo, unfilteredPageNum) {
        let dateFrom = "";
        let dateTo = "";
        let name = "";
        let competenceId = 0;
        if (unfilteredDateFrom !== "" && unfilteredDateFrom !== undefined && unfilteredDateFrom !== null) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateFrom = unfilteredDateFrom.toLocaleDateString('sv-SE', options);
        }
        if (unfilteredDateTo !== "" && unfilteredDateTo !== undefined && unfilteredDateTo !== null) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateTo = unfilteredDateTo.toLocaleDateString('sv-SE', options);
        }
        if (unfilteredName !== "") {
            name = unfilteredName;
        }
        if (unfilteredCompetenceId !== "") {
            competenceId = unfilteredCompetenceId;
        }

        this.filterApplications(name, competenceId, dateFrom, dateTo, unfilteredPageNum);
    }

    /**
     * Create an application for the user for the job.
     * @param {number} competenceId The competence id that is related to the job.
     * @param {number} yearsOfExperience The amount of experience that the user has in the job.
     * @param {string} dateFrom The start date of the user availability.
     * @param {string} dateTo The end date of the user availability.
     */
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

    /**
     * Filter out the info about the submission of the application parameters. The user must be an applicant.
     * @param {number} unfilteredCompetenceID The unfiltered name that could be empty.
     * @param {number} unfilteredYearsOfExperience The id of the competence that could be empty.
     * @param {string} unfilteredDateFrom The start date of the user availability that could be empty.
     * @param {string} unfilteredDateTo The end date of the user availability that could be empty.
     */
    filterSubmittedApplicationData(unfilteredCompetenceID, unfilteredYearsOfExperience, unfilteredDateFrom, unfilteredDateTo) {
        let dateFrom = "";
        let dateTo = "";
        let competenceId = 0;
        let yearsOfExperience = 0;
        if (unfilteredDateFrom !== "" && unfilteredDateFrom !== undefined) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateFrom = unfilteredDateFrom.toLocaleDateString('sv-SE', options);
        }
        if (unfilteredDateTo !== "" && unfilteredDateTo !== undefined) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateTo = unfilteredDateTo.toLocaleDateString('sv-SE', options);
        }
        if (unfilteredCompetenceID !== "") {
            competenceId = parseInt(unfilteredCompetenceID);
        }
        if (unfilteredYearsOfExperience !== "") {
            yearsOfExperience = parseInt(unfilteredYearsOfExperience);
        }

        this.submitApplication(competenceId, yearsOfExperience, dateFrom, dateTo);
    }

    /**
     * Get the competences that are related jobs.
     * @returns {[{id, type}]} Array with the competences related to the job. 
     */
    getCompetenceList() {
        return this.competenceList;
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
     * Set the job information with all their data.
     * @param {[jobID, description, {id, type}]} dataContent The content related to the jobs. 
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

    /**
     * Set all the applications that are filtered.
     * @param {{applicationID, firstName, lastName, competenceType, yearsOfExperience, dateFrom, 
     *          dateTo, decision}} filteredApplications The applications that are filtered.
     */
    populateApplicationsData(filteredApplications) {
        let applications = filteredApplications.applications;
        this.applicationsList = applications;
        this.notifyObservers();
    }

    /**
     * Set the application details with all the needed information.
     * @param {{applicationID, firstName, lastName, competenceType, yearsOfExperience, dateFrom, 
     *          dateTo, decision}} applicationDetails The application details.
     */
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

    /**
     * Get the application details with all the needed information.
     * @return {{applicationID, firstName, lastName, competenceType, yearsOfExperience, dateFrom, 
     *          dateTo, decision}} the application details.
     */
    returnChosenApplicationDetails() {
        return this.chosenApplicationData;
    }

    /**
     * Set the id for the submitted application.
     * @param {{id}} dataContent The data with an id content.
     */
    populateSubmittedApplicationData(dataContent) {
        this.latestSubmittedApplicationID = dataContent.applicationID;
        this.notifyObservers();
    }

    /**
     * Get the id for the submitted application.
     * @returns {number} The id for the submitted application.
     */
    getSubmittedApplicationID() {
        return this.latestSubmittedApplicationID;
    }

    /**
     * Get the applications that were filtered.
     * @returns {[{firstName, lastName}]} An array of applications.
     */
    getApplicationsList() {
        return this.applicationsList;
    }

    /**
     * Set the id value of the current application.
     * @param {number} applicationID The id of the application.
     */
    setCurrentApplicationID(applicationID) {
        this.currentApplicationID = applicationID;
        this.notifyObservers();
    }

    /**
     * Get the last id for the application which is the most recent.
     * @returns {number} The id of the most recent application.
     */
    getCurrentApplicationID() {
        return this.currentApplicationID;
    }

    /**
     * Set the taken decision for last application.
     * @param {{decision}} dataContent The decision content.
     */
    populateTakenDecisionData(dataContent) {
        this.latestApplicationDecision = dataContent.decision;
        this.notifyObservers();
    }

    /**
     * Reset the info about the last registered application.
     */
    emptySubmittedApplicationID() {
        this.latestSubmittedApplicationID = null;
        this.notifyObservers();
    }

    /**
     * Reset the info about the application to display.
     */
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

export default ApplicationModel;