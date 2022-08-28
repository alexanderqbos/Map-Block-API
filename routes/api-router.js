import passport from 'passport';
import express from 'express';
import { getAllMessages, addNewMessage, UpdateMessage, RemoveMessage } from '../controllers/msg-api-controller.js'
import { registerNewUser, logInUser } from '../controllers/user-api-controller.js'
// import { getLabs } from '../controllers/exam-api-controller.js'

const router = express.Router();

router.route('/messages/')
    .get(getAllMessages)
    .post(passport.authenticate('jwt', { session: false }), addNewMessage);

router.route('/messages/:messageId')
    .patch(passport.authenticate('jwt', { session: false }), UpdateMessage)
    .delete(passport.authenticate('jwt', { session: false }), RemoveMessage);

router.route('/users/')
    .post(registerNewUser);

router.route('/login/')
    .post(passport.authenticate('local', { session: false }), logInUser);

// Mid-Term API
// router.route('/labs/')
// .get(getLabs);

export default router;