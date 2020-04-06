const sequelize = require('sequelize');
const waterfall = require('async/waterfall');
const nextTick = require('async/nextTick');
const responses = require('./utils/responses')['pt-br'];
const handles = require('./utils/handles');
const paginate = require('./utils/paginate');
const Posts = require('../model/Posts')
const Likes = require("../model/Likes")
const { Op } = sequelize;

module.exports = {
    get(req, res) {
        const providedPostId = req.params.postId;
        Posts.findOne({
            where: {
                id: providedPostId
            },
            include: [{
                model: Likes,
                through: {
                    attributes: []
                }
            }]
        })
        .then(posts => {
            if (!posts) {
                return res.status(404).json({
                    status: 'error',
                    ...responses.errors.noNewsFound
                });
            }

            Likes.findAll({
                where: {
                    postId: providedPostId
                },
                attributes: [[sequelize.fn('count', 'userId'), 'count']],
                include: [
                ],
                subQuery: false,
            })
            .then(likes => {
                if (likes) {
                    posts = {
                        ...posts.toJSON(),
                        likes
                    }
                }

                res.json({
                    status: 'success',
                    posts
                });
            })
            .catch(handles.handleServerError(res));
        })
        .catch(handles.handleServerError(res));
    },
    update(req, res) {
        const postId = req.params.postId;
        Posts.update({
            ...req.body
        }, {
            where: {
                id: postId
            }
        })
        .then(([affected]) => {
            if (affected === 0 && !req.body.tags) {
                return res.status(404).json({
                    status: 'error',
                    ...responses.errors.noNewsFound
                });
            }
            res.json({
                status: 'success',
                newsId: postId.toString()
            });
        })
        .catch(handles.handleServerError(res));
    },
    add(req, res) {
        Posts.create({
            ...req.body,
            userId: req.params.userId,
            publication_date: new Date();
        })
        .then(post => {
            res.json({
                status: 'success',
                postId: post.id.toString()
            });
        })
        .catch(handles.handleServerError(res));
    },
    remove(req, res) {
        Posts.destroy({
            where: {
                id: req.params.postId
            }
        })
        .then(postCount => {
            if (postCount) {
                res.json({
                    status: 'success',
                    message: 'Post removido com sucesso.'
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    ...responses.errors.noNewsFound
                });
            }
        })
        .catch(handles.handleServerError(res));
    },

    like(req, res) {
        Likes.create({
            userId: req.params.userId,
            postId: req.params.postId
        })
        .then(like => {
            res.json({
                status: 'success',
                likeId: like.id.toString()
            });
        })
        .catch(handles.handleServerError(res));

    },

    unlike(req, res) {
         Likes.destroy({
            where: {
                userId: req.params.userId,
                postId: req.params.postId
            }
        })
         .then(likeCount => {
            if (likeCount) {
                res.json({
                    status: 'success',
                    message: 'Like removido com sucesso.'
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    ...responses.errors.noNewsFound
                });
            }
        })
         .catch(handles.handleServerError(res));
     },

     search_range(req, res) {
        Posts.findAndCountAll({
            where: {
                publication_date: {
                    [Op.between]: [req.params.startDate, req.params.endDate]
                }
            }
        })
        .then(result => {
            res.json({
                status: 'success',
                users: result.rows
            });
        })
        .catch(handles.handleServerError(res));
     }
};
