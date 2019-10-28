const functions = require('firebase-functions');
const {dbStore} = require('../../firebase');

const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
const arrangeInput = require('../../middleware/arrange-inputs');
/**
 *  @swagger
 *  /v1/transaction:
 *    post:
 *      tags:
 *        - transaction
 *      description: save transaction
 *      parameters:
 *        - name: recipient
 *          default: transactionName
 *          required: true
 *          in: formData
 *          type: string
 *        - name: value
 *          default: transactionName
 *          required: true
 *          in: formData
 *          type: number
 *      responses:
 *        200:
 *          description: return saved transaction object
 */

router.post('/transaction',
    arrangeInput('body', {
        recipient: {
            type: 'STRING',
            required: true,
            message: 'Recipient is not defined',
        },
        value: {
            required: true,
            type: 'INTEGER',
            message: 'Value is not defined',
        },
    }),
    authenticate(),
    errors.wrap(async (req, res) => {
        const message = req.body;
        const writeResult = await dbStore.collection('messages').add(message);
        res.json({ result: `Message with ID: ${writeResult.id} added.` });
    })
);

module.exports = router;