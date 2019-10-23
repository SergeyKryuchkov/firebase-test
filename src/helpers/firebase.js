const Firebase = require('firebase');
const config = require('config');
const firebase = Firebase.initializeApp(config.firebase);
const firestore = firebase.database();
module.exports = { firebase, firestore };
