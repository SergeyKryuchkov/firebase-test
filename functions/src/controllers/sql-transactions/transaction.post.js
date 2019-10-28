const router = require('express').Router();
const errors = require('../../errors');
const { sequelize } = require('../../sql-database/database');
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
        const models = res.app.get('models');
        const user = res.locals.user;
        const transactionRecord = req.body;
        const recipient = await models.User.findById(transactionRecord.recipient);
        if (!recipient) throw errors.NotFoundError('No recipient with such ID');
        if ((user.credits - +transactionRecord.value) < 0) throw errors.InvalidInputError('Not enough credits');
        transactionRecord.sender = user.uuid;

        let dbTransaction;
        try {
            dbTransaction = await sequelize.transaction({ autocommit: false });
            user.credits -= +transactionRecord.value;
            recipient.credits += +transactionRecord.value;
            await user.save();
            await recipient.save();
            const result = await models.Transaction.create(transactionRecord);
            dbTransaction.commit();
            res.json(result);
        } catch (e) {
            dbTransaction.rollback();
            throw e;
        }
    })
);

module.exports = router;
