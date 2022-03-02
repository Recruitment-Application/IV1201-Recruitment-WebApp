import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserModel from "./js/UserModel";
import ApplicationModel from "./js/ApplicationModel";
import 'bootstrap/dist/css/bootstrap.min.css';


const userModel = new UserModel();
const applicationModel = new ApplicationModel();

ReactDOM.render(<App userModel={userModel} applicationModel = {applicationModel}/>, document.getElementById("app"));
