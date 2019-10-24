'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    const writeResult = await admin.firestore().collection('messages').add({ original: original });
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
});


exports.doTransaction = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') res.status(404).send('Not Found');
    const messages = await admin.firestore().collection('messages').get();
    const result = [];
    messages.forEach(doc => {
        result.push(doc.data());
    });
    res.json(result);
});

exports.getMessages = functions.https.onRequest(async (req, res) => {
    const messages = await admin.firestore().collection('messages').get();
    const result = [];
    messages.forEach(doc => {
        result.push(doc.data());
    });
    res.json(result);
});


exports.createCustomUser = function () {
    ref.onAuth(function (authData) {
        if (authData && isNewUser) {
            // save the user's profile into Firebase so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            ref.child("users").child(authData.uid).set({
                provider: authData.provider,
                name: getName(authData)
            });
        }
    });
};

// [START makeUppercase]
// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// [START makeUppercaseTrigger]
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
// [END makeUppercaseTrigger]
        // [START makeUppercaseBody]
        // Grab the current value of what was written to the Cloud Firestore.
        const original = snap.data().original;
        console.log('Uppercasing', context.params.documentId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Cloud Firestore.
        // Setting an 'uppercase' field in the Cloud Firestore document returns a Promise.
        return snap.ref.set({ uppercase }, { merge: true });
        // [END makeUppercaseBody]
    });
