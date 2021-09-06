const express = require('express');

const router = express.Router()

const { users: ctrl } = require('../../controllers');

const { joiUserSchema } = require("../../models/user");
const { validation, controllerWrapper, authenticate } = require("../../middlewares");


const UserValidationMiddleware = validation(joiUserSchema);

router.post('/signup', authenticate,  UserValidationMiddleware, controllerWrapper(ctrl.signup));
router.post('/login', authenticate, UserValidationMiddleware, controllerWrapper(ctrl.login));
router.post('/logout', authenticate, controllerWrapper(ctrl.logout));
router.get('/current', authenticate,  UserValidationMiddleware, controllerWrapper(ctrl.getCurrent))

module.exports = router;

