"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const cors = require("cors");
const express = require("express");
const helpers_1 = require("./helpers");
exports.app = express();
exports.app.use(cors({ origin: '*' }));
exports.app.use(helpers_1.helpers.auth.authenticateUser);
//// Initialize Firebase ////
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
// const serviceAccount = require('../serviceAccount' + env + '.json');
// adminConfig.credential = admin.credential.cert(serviceAccount);
// admin.credential.cert(serviceAccount);
admin.initializeApp();
exports.dbstore = admin.firestore();
exports.db = admin.database();
exports.auth = admin.auth();
//# sourceMappingURL=config.js.map