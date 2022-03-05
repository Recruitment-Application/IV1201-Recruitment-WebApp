import BASE_URL from "./apiConfig";

/**
 * Responsible for the api calls that will happen in the website. Ranging from creating the 
 * proper request to receiving the response.
 */
const ApiData = {
    /**
     * The base api call function that fetches resources using the BASE_URL, and the specified urlPath 
     * according to the needed functionality to be preformed. 
     * fetch function is using a base URL for the requests that is the hosted server, 
     * the information about the host server is specified in the apiConfig.js.
     * @param {string} urlPath Specific URL related to the api for retrieving specific recourses.
     * @param {Request} requestContent The request content needed for the request to fetch the info. 
     *                                 it will contain method type, credentials, headers and body.
     * @returns {Response} The response from the sent request.
     * @throws {Exception} Any type of error that could be encountered through the call.
     */
    apiCall(urlPath, requestContent) {
        const fetchData = fetch(BASE_URL + urlPath, requestContent)
            .then((response) => { return response; })
            .catch((error) => { throw error; });
        return fetchData;
    },

    /**
     * Create the proper request with the user info to try to sign in 
     * the user into the account.
     * user/signin is the endpoint that the api call will answer to for 
     * signing in users.
     * @param {string} username The username of the account.
     * @param {string} password The password of the account.
     * @returns {Response} The response after signing in. 
     */
    signinUser(username, password) {
        return this.apiCall(
            'user/signin'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Checks if the user is still signed in according to the stored cookie.
     * user/checkSignin is the endpoint that the api call will answer to for
     * checking the sing in validation. 
     * @returns {Response} The response after the signin check.
     */
    checkSignin() {
        return this.apiCall(
            'user/checkSignin'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Sign out the user that was signed in before.
     * user/signout is the endpoint that the api call will answer to for
     * signing out the user.
     * @returns {Response} The response after signing out. 
     */
    signoutUser() {
        return this.apiCall(
            'user/signout'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Try to create a new account for the new user. Providing the needed info about the new user.
     * user/signup is the endpoint that the api call will answer to for
     * signing up the user with a new account.
     * @param {string} firstName The first name of the new user.
     * @param {string} lastName The last name of the new user.
     * @param {string} personNumber The personal number of the new user.
     * @param {string} email The email of the new user.
     * @param {string} username the username for the new account.
     * @param {string} password The password for the new account.
     * @returns {Response} The response after trying to create the new account.
     */
    signupUser(firstName, lastName, personNumber, email, username, password) {
        return this.apiCall(
            'user/signup'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "firstname": firstName,
                    "lastname": lastName,
                    "personalNumber": personNumber,
                    "email": email,
                    "username": username,
                    "password": password
                }),
            })
            .then((response) => {
                return response;
            });
    },

    /**
     * Get the jobs that are available.
     * job/getJobs is the endpoint that the api call will answer to for getting the jobs.
     * @returns {Response} The response after getting the available jobs.
     */
    getJobs() {
        return this.apiCall(
            'job/getJobs'
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * List the application that could be filtered with different values that are the parameters. 
     * The user must be a recruiter.
     * job/listApplications is the endpoint that the api call will answer to for
     * getting the application that are following the filtering parameters if they exist.
     * There are specific values for the parameters indicating if they exist.
     * @param {string} name The name of the applicant that the application relates to.
     *                      Leaving it empty means no filtering with name.
     * @param {number} competenceId The competence that is related to the application filtering.
     *                              Leaving it with 0 value means no filtering with competence.
     * @param {string} dateFrom The start date that the user is available.
     *                          Leaving it empty means no filtering with dateFrom.
     * @param {string} dateTo The end date that the user is available.
     *                        Leaving it empty means no filtering with dateTo.
     * @param {number} page The page that the list is needed to get.
     *                      Leaving it with 0 value means all the applications.
     * @returns {Response} The response after listing the application that maybe were filtered.
     */
    listApplications(name, competenceId, dateFrom, dateTo, page) {
        return this.apiCall(
            'job/listApplications?' + new URLSearchParams({
                "name": name,
                "competenceId": competenceId,
                "dateFrom": dateFrom,
                "dateTo": dateTo,
                "page": page
            })
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Get all needed information about an application. The user must be a recruiter.
     * job/getApplication is the endpoint that the api call will answer to for
     * getting the information desired about the application.
     * @param {number} applicationId The id for the specified application.
     * @returns {Response} The response after trying to retrieve the application info.
     */
    getApplicationDetails(applicationId) {
        return this.apiCall(
            'job/getApplication?' + new URLSearchParams({
                "applicationId": applicationId
            })
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Register a new application for the user with the needed information. The user must be an applicant.
     * job/registerApplication is the endpoint that the api call will answer to for
     * registering the application for the application(user).
     * @param {number} competenceId The competence id that is related to the job.
     * @param {number} yearsOfExperience The amount of experience that the applicant has in the job.
     * @param {string} dateFrom The start date that the user is available.
     * @param {string} dateTo The end date that the user is available
     * @returns {Response} The response after trying to register the new application for the applicant.
     */
    submitApplication(competenceId, yearsOfExperience, dateFrom, dateTo) {
        return this.apiCall(
            'job/registerApplication'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "competenceId": competenceId,
                    "yearsOfExperience": yearsOfExperience,
                    "dateFrom": dateFrom,
                    "dateTo": dateTo
                }),
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Take a decision about an application and submit the decision. The user must be a recruiter.
     * job/submitDecision is the endpoint that the api call will answer to for
     * submitting the decision about the application.
     * @param {number} applicationId The id of the application that the decision is related to.
     * @param {string} decision The decision taken about the application.
     * @returns {Response} The response after trying to submit the decision about an application.
     */
    submitApplicationDecision(applicationId, decision) {
        return this.apiCall(
            'job/submitDecision'
            , {
                method: 'put',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "applicationId": applicationId,
                    "decision": decision
                }),
            }
        )
            .then((response) => {
                return response;
            });
    },
};

export default ApiData;
