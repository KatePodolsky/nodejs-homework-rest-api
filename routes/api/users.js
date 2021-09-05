const express = require('express');

const router = express.Router()

const { users: ctrl } = require('../../controllers');

const { joiUserSchema } = require("../../models/user");
const { validation, controllerWrapper,authenticate } = require("../../middlewares");

const UserValidationMiddleware = validation(joiUserSchema);

// router.post('/signup', UserValidationMiddleware, controllerWrapper(ctrl.signup));
// router.post('/login',  UserValidationMiddleware, controllerWrapper(ctrl.login));

router.post('/signup', authenticate,  UserValidationMiddleware, controllerWrapper(ctrl.signup));
router.post('/login', authenticate, UserValidationMiddleware, controllerWrapper(ctrl.login));
router.get('/current', authenticate,  UserValidationMiddleware, controllerWrapper(ctrl.current))
// router.post('/logout', controllerWrapper(ctrl.logout));

module.exports = router;

