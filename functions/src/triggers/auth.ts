import * as functions from 'firebase-functions';
import {dbstore} from '../config';
import {User} from '../models/user';

// Firestore version
export const createUser = functions.auth
  .user().onCreate((user , context) => {

    const userRef = dbstore.collection('users').doc(user.uid);
    console.log(JSON.stringify(user));
    const defaultRole: Roles = {
      admin: false ,
      partner: false ,
      support: false ,
      traveler: true
    };
    const data: User = {
      uuid: user.uid ,
      email: user.email ,
      createdAt: user.metadata.creationTime ,
      updatedAt: Date.now().toString() ,
    };
    return userRef.set(data , {merge: true});

  });
