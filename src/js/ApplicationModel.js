
import ApiData from "./apiData";

class ApplicationModel {

    constructor() {
        this.subscribers = [];
        this.competenceList = [];

        // this.competence = {
        //     competenceId: null,
        //     competenceType: null,
        // }
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
        this.getJobs();
    }


    // Performs login to existing account and fills the userModel with the user data.
    getJobs() {
        ApiData.getJobs().then((result) => {
            if (result.ok) {
                result.json().then((data) => {
                    let dataContent = data.success;
                    this.populateJobData({ dataContent });
                });
            }
        });

    }


    // 
    getCompetenceList() {
        return this.competenceList; // will this be called and list the jobs as well, or just the competenceList for one job ?
    }

    filterApplicationsByRecruiter(name, competenceId, dateFrom, dateTo, pageNum) {

        ApiData.listApplications(name, competenceId, dateFrom, dateTo, pageNum)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateApplicationsData({ dataContent });
                        this.notifyObservers();
                    });
                }
            });

    }

    filterDateInApplicationAndForwardToApiData(unfilteredName, unfilteredCompetenceId, unfilterdDateFrom, unfilterdDateTo, unfilteredPageNum) {
        let dateFrom = "";
        let dateTo = "";
        let name = "";
        let competenceId = 0;
        if (unfilterdDateFrom !== "" && unfilterdDateFrom !== undefined) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateFrom = unfilterdDateFrom.toLocaleDateString('sv-SE', options);
        }
        if (unfilterdDateTo !== "" && unfilterdDateTo !== undefined) {
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


        this.filterApplicationsByRecruiter(name, competenceId, dateFrom, dateTo, unfilteredPageNum);



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
    populateJobData({ dataContent }) {
        if (!this.filledDataOnce) {


            for (let i = 0; i < dataContent.length; i++) {

                //let competenceNum = data.success[i].competences.length;

                for (let j = 0; j < dataContent[i].competences.length; j++) {
                    let competence = {
                        competenceId: dataContent[i].competences[j].id,
                        competenceType: dataContent[i].competences[j].type,
                    }
                    this.competenceList = [competence, ...this.competenceList];
                }
                console.log(this.competenceList);

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
        let applications = filteredApplications.dataContent.applications;
        this.applicationsList = applications;

        this.notifyObservers();
    }

    getApplicationsList() {
        //console.log(this.applicationsList);
        return this.applicationsList;
    }


    setCurrentApplicationID(applicationID) {
        this.currentApplicationID = applicationID;
        this.notifyObservers();
    }

    getCurrentApplicationID() {
        return this.currentApplicationID;
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


}

export default ApplicationModel;