const express = require('express');
const {
    userPosts: userPostsService,
} = require('../controller');

const checkFields = require('../middleware/check-fields');
const postController = new express.Router();

const postFields = [
    'description', 'post_date', 'post_photo'
];

postController.post('/:user_id/posts', checkFields(postFields), userPostsService.add)
postController.put('/:user_id/posts/:post_id', checkFields(postFields), userPostsService.update)
postController.delete('/:user_id/posts/:post_id', userPostsService.remove)
postController.get('/:user_id/posts/:post_id', userPostsService.get)

postController.get('/:user_id/posts/:post_id/likes', userPostsService.getlikes)
postController.post('/:user_id/posts/:post_id/likes', userPostsService.like)

module.exports = postController;