const admin = require('firebase-admin');
admin.initializeApp();
const dbStore = admin.firestore();
const db = admin.database();
const auth = admin.auth();

module.exports = {
    auth,
    db,
    dbStore
};