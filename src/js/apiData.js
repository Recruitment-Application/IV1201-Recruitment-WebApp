import BASE_URL from "./apiConfig";

const ApiData = {
    apiCall(urlPath, requestContent) {
        const fetchData = fetch(BASE_URL + urlPath, requestContent)
            .then((response) => {

                return response;
            });
        return fetchData

    },

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

    signoutUser(){
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
    }

};

export default ApiData;
