const express = require('express');
const {
    user: userService,
    userPosts: userPostsService,
} = require('../controller');

const checkSignupToken = require('../middleware/check-signup-token');
const checkAccessToken = require('../middleware/check-access-token');
const checkRecoverToken = require('../middleware/check-recover-token');
const checkFields = require('../middleware/check-fields');
const userController = new express.Router();

const userFields =  [
    'email', 'password', 'first_name', 'last_name', 'birthdate', 'city', 'state', 'country', 'district', 'username', 'age', 'personal_photo'
];

// Authentication routes
userController.delete('/signout', checkAccessToken(), userService.logout);
userController.post('/signup', checkFields(userFields), userService.create);
userController.post('/signin', checkFields(userFields.slice(0, 2)), userService.login);
userController.post('/confirm', checkSignupToken, userService.confirm);
userController.post('/resend-code', checkFields(userFields.slice(0, 2)), userService.resendCode);
userController.get('/recover-password', userService.recoverPasswordPage);
userController.post('/recover-password', checkFields(['email']), userService.recoverPassword);
userController.put('/update-password', checkRecoverToken, checkFields(['new_password']), userService.updatePassword);

userController.get('/:user_id', checkAccessToken({ checkParams: true }), userService.get);
userController.get('/', checkAccessToken({ isAdmin: true }), userService.get); // Only with admin permissions
userController.put('/:user_id', checkFields(userFields.slice(2), false), checkAccessToken({ checkParams: true }), userService.update);
userController.delete('/:user_id', checkAccessToken({ checkParams: true }), userService.destroy);

module.exports = userController;