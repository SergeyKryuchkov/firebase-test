const Firebase = require('firebase');
const config = require('config');
const firebase = Firebase.initializeApp(config.firebase);
const firestore = firebase.firestore();
const auth = firebase.auth();
module.exports = { auth, firestore };