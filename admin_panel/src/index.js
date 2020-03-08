import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// window.apiurl = "http://pclinic.ritzyware.net:3001";
window.apiurl = "http://localhost:3000";
//window.tinyAPIKEY = "";
//window.apiurl = "http://localhost:3000";
window.tinyAPIKEY = "e8w755v72e92ytu4phfw2z4wgycbeq7x2twygyk0umom9ot3";
window.user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
