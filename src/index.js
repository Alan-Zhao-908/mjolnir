import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppComments from './AppComments'
import * as serviceWorker from './serviceWorker';
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import firebase from 'firebase';

// Set the configuration for your app
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD5dfcxpuQujaGMv59oJcw7xp9p0c-1spI",
	authDomain: "livestream-hackathon-life.firebaseapp.com",
	databaseURL: "https://livestream-hackathon-life.firebaseio.com",
	projectId: "livestream-hackathon-life",
	storageBucket: "livestream-hackathon-life.appspot.com",
	messagingSenderId: "432758895335",
	appId: "1:432758895335:web:486610f9b26931b13ee842"
};

ReactDOM.render(<App/>, document.getElementById('root'));

ReactDOM.render(
	<FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
			<AppComments/>
	</FirebaseDatabaseProvider>, document.getElementById('root2'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
