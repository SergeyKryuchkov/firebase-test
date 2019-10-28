const {dbStore} = require('../../firebase');
const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');

router.get('/transactions',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const messages = await dbStore.collection('messages').get();
        const result = [];
        messages.forEach(doc => {
            result.push(doc.data());
        });
        res.json(result);
    })
);

module.exports = router;


