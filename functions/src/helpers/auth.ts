import {auth} from '../config';

// Authenticates Firebase user on HTTP functions, used as expressJS middleware
export function authenticateUser(req , res , next): void {

  let authToken;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    authToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    res.status(403).send(`Must provide a header that looks like "Authorization: Bearer <Firebase ID Token>"`);
  }

  auth.verifyIdToken(authToken)
    .then(decodedToken => {
      req.user = decodedToken;
      next();
    })
    .catch(err => res.status(403).send(err));
}
