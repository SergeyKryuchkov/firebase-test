const router = require('express').Router();
const errors = require('../../errors');
const arrangeInput = require('../../middleware/arrange-inputs');

/**
 *  @swagger
 *  /signin:
 *    post:
 *      tags:
 *        - user management
 *      description: sign in user
 *      parameters:
 *        - name: email
 *          description: user name
 *          default: JohnSnow
 *          in: formData
 *          type: string
 *          required: true
 *        - name: password
 *          description: password
 *          default: qwerty
 *          in: formData
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          description: user signed in
 *        401:
 *          description: unauthorized
 */

router.post('/signin',
    arrangeInput('body', {
        email: {
            type: 'STRING',
            required: true,
            message: 'Email is not defined',
        },
        password: {
            type: 'STRING',
            required: true,
            message: 'Password is not defined',
        },
    }),
    errors.wrap(async (req, res) => {
        const models = res.app.get('models');
        const user = await models.User.authenticate(req.body.email, req.body.password);
        const token = await user.generateToken();

        await user.save();
        delete user.dataValues.password;
        res.json({
            user: user,
            token: token,
        });
    })
);

module.exports = router;
