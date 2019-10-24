"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const config_1 = require("../config");
// Firestore version
exports.createUser = functions.auth
    .user().onCreate((user, context) => {
    const userRef = config_1.dbstore.collection('users').doc(user.uid);
    console.log(JSON.stringify(user));
    const defaultRole = {
        admin: false,
        partner: false,
        support: false,
        traveler: true
    };
    const data = {
        uuid: user.uid,
        email: user.email,
        createdAt: user.metadata.creationTime,
        updatedAt: Date.now().toString(),
    };
    return userRef.set(data, { merge: true });
});
//# sourceMappingURL=auth.js.map