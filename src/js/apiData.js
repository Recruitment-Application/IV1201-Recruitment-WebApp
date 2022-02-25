import BASE_URL from "./apiConfig";

const ApiData = {
    /**
     * the base apiCall function that fetch the BASE_URL, the sent urlPath according to each function 
     * and the requestContent contains required inputs differs from a function to another.
     * fetch function is a used to request to a server specified in the ./apiConfig URL running at the same time parallel with the webapp npm.
     * fetch also load the information in the webpages.
     * @param {*} urlPath passed url by function while calling apiCall. 
     * @param {*} requestContent the requestedContent by function while calling apiCall. 
     *                           it will contain method type, credentials, headers and body.
     * @returns returns teh response.
     */
    apiCall(urlPath, requestContent) {
        const fetchData = fetch(BASE_URL + urlPath, requestContent)
            .then((response) => {

                return response;
            });
        return fetchData

    },

    /**
     * signinUser function passes the username and password as a body content to the user/signin path to siginin to the specified user account.
     * @param {*} username the entered username
     * @param {*} password the entered password
     * @returns returns the reponse after signing in. 
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
                body: JSON.stringify({ "username": username, "password": password }),

            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * checkSignin function checks if the user is still signed in according to the stored cookies. 
     * @returns return the repsonse of the apicall.
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
     * signout the user from the webpage.
     * @returns return the repsonse of the apiCall.
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
     * The function signup a new user to the database and keep the user signedin after signin up on the webpage. 
     * Send the entered data as a body content in JSON.stringify({})
     * @param {*} firstName the entered user's firstName
     * @param {*} lastName the entered user's lastName
     * @param {*} personNumber the entered user's personNumber
     * @param {*} email the entered user's email
     * @param {*} username the entered user's username
     * @param {*} password  the entered user's password
     * @returns return the repsonse of the apiCall.
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
                    "firstname": firstName, "lastname": lastName,
                    "personalNumber": personNumber, "email": email, "username": username, "password": password
                }),

            }
        )
            .then((response) => {
                return response;
            });
    }, 

    getJobs() {
        //http://127.0.0.1:3030/job/getJobs
        return this.apiCall(
            'job/getJobs'
            , {
                method: 'get',
                credentials: 'include',
            }
        ).then((response) => {
            return response;
        });
    },

    // filterApplications(username, password) {

    //     return this.apiCall(
    //         'user/signin'
    //         , {
    //             method: 'post',
    //             credentials: 'include',
    //             headers: {
    //                 'Accept': 'application/json, text/plain, */*',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ "username": username, "password": password }),

    //         }
    //     ).then((response) => {
    //         return response;
    //     });
    // },

};

export default ApiData;
