"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
// Authenticates Firebase user on HTTP functions, used as expressJS middleware
function authenticateUser(req, res, next) {
    let authToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        authToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        res.status(403).send(`Must provide a header that looks like "Authorization: Bearer <Firebase ID Token>"`);
    }
    config_1.auth.verifyIdToken(authToken)
        .then(decodedToken => {
        req.user = decodedToken;
        next();
    })
        .catch(err => res.status(403).send(err));
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map