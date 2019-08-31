import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBYmJw8zOH2J6sHnJQUC64y8IkH9rXdqhg",
    authDomain: "test-applications-cff37.firebaseapp.com",
    databaseURL: "https://test-applications-cff37.firebaseio.com",
    projectId: "test-applications-cff37",
    storageBucket: "test-applications-cff37.appspot.com",
    messagingSenderId: "586080380687",
    appId: "1:586080380687:web:e26b4e2045b1a8ed"
  };

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
