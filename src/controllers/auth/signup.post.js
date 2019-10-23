const router = require('express').Router();
const errors = require('../../errors');
const { sequelize } = require('../../database');
const { firestore } = require('../../helpers/firebase');
const arrangeInput = require('../../middleware/arrange-inputs');

/**
 *  @swagger
 *  /signup:
 *    post:
 *      tags:
 *        - user management
 *      description: sign up in user
 *      parameters:
 *        - name: email
 *          default: JohnDoe@gmail.com
 *          required: true
 *          in: formData
 *          type: string
 *        - name: password
 *          default: 123
 *          in: formData
 *          type: string
 *          required: true
 *        - name: confirmPassword
 *          default: 123
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: user signed up
 *        401:
 *          description: invalid credentials
 */
router.post('/signup',
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
        confirmPassword: {
            type: 'STRING',
            required: true,
            message: 'Password is not defined',
        },
    }),
    errors.wrap(async (req, res) => {
        const userData = { ...req.body, ...{ credits: 100000 } };
        if (userData.password !== userData.confirmPassword) throw errors.InvalidInputError('Passwords does not match');
        const models = res.app.get('models');


        let transaction;
        try {
            const User = models.User;
            transaction = await sequelize.transaction({ autocommit: false });

            const user = await User.create(userData);

            await firestore.collection('users').add({
                email: user.email,
                credits: 100000,
            });

            if (!user) throw errors.NotFoundError('User not created, invalid or missing credentials');
            const token = await user.generateToken();
            delete user.dataValues.password;

            await transaction.commit();

            return res.json({
                user: user,
                token: token,
            });


        } catch (e) {
            console.log("===============================")
            if (transaction) await transaction.rollback();
            console.log("===============================")
            throw(e);
        }


    })
);

module.exports = router;