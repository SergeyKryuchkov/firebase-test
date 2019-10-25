import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import {helpers} from './helpers';
const database = require('./database');

export const app = express();

app.set('models', database.models);
app.set('sequelize', database.sequelize);

app.use(cors({origin: '*'}));
app.use(helpers.auth.authenticateUser);


//// Initialize Firebase ////
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
// const serviceAccount = require('../serviceAccount' + env + '.json');
// adminConfig.credential = admin.credential.cert(serviceAccount);
// admin.credential.cert(serviceAccount);

admin.initializeApp();

export const dbstore = admin.firestore();
export const db = admin.database();
export const auth = admin.auth();
