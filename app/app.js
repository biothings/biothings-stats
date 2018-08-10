// Include the Main React Dependencies
import React from 'react'
import ReactDOM from "react-dom";
import routes from '../controllers/reactroutes.js';

const css = require('./app.scss');

// This code here allows us to render our main component (in this case "Main")
// ReactDOM.render(routes, document.getElementById("app"));

const app = document.getElementById('app');

ReactDOM.render(routes, app);
