import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap-4.4.1-dist/css/bootstrap.min.css";
import {moviesData} from "./moviesData.js";

console.log(moviesData);

ReactDOM.render(<App />, document.getElementById("root"));

