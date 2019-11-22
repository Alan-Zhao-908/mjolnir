import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import TimerComponent from "./timerComponent";
import VoteComponent from "./voteComponent";
import CommentComponent from "./commentComponent";

ReactDOM.render(<TimerComponent />, document.getElementById("timer"));

ReactDOM.render(<VoteComponent />, document.getElementById("vote"));

ReactDOM.render(<CommentComponent />, document.getElementById("comment"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
