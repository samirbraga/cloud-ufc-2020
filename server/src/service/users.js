const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const responses = require('./utils/responses')['pt-br'];
const handles = require('./utils/handles');
const paginate = require('./utils/paginate');
const config = require('../config');
const dbUtils = require('../db/utils');
const TokenBlacklist = require('../model/TokenBlacklist');
const Users = require('../model/User');
const EmailService = require('./email');

const _generateVerificationCode = () => {
    const rand = () => Math.floor(Math.random() * 10); 
    return `${rand()}${rand()}${rand()}${rand()}`;
};

module.exports = {
    get(req, res) {
        const providedUserId = req.params.userId;
        if (providedUserId) {
            const tokenUserId = req.tokenData.userId;

            if (providedUserId === tokenUserId) {
                Users.findOne({
                    where: {
                        id: providedUserId,
                        confirmed: true
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                    ]
                })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({
                            status: 'error',
                            ...responses.errors.noUserFound
                        });
                    }
                })
                .catch(handles.handleServerError(res));
            } else {
                res.status(403).json({
                    status: 'error',
                    ...responses.errors.accessDenied
                });
            }
        } else {
            Users.findAndCountAll({
                where: {
                    confirmed: true
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                ],
                ...paginate(req).query
            })
            .then(result => {
                res.json({
                    ...paginate(req).response(result),
                    status: 'success',
                    users: result.rows
                });
            })
            .catch(handles.handleServerError(res));
        }
    },
    get_by_username(req, res) {
        const providedUsername = req.query.q;
        Users.findOne({
            where: {
                id: providedUsername
            },
            attributes: {
                exclude: ['password']
            },
            include: []
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    ...responses.errors.noUserFound
                });
            }
        })
        .catch(handles.handleServerError(res));
    },
    
    create(req, res) {
        bcrypt.hash(req.body.password, config.BCRYPT_SALT_ROUNDS, (err, hash) => {
            if (err)
                return handles.handleServerError(res)();
            
            Users.create({
                ...req.body,
                password: hash
            })
            .then(user => {
                const code = _generateVerificationCode();
                const tokenData = {
                    id: generateId(),
                    userId: user.id.toString(),
                };

                jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                    if (err)
                        return handles.handleServerError(res)();

                    TokenBlacklist.create({
                        id: tokenData.id,
                        token,
                        type: 'signup',
                        code,
                        attempts: 0
                    })
                    .then(() => {
                        if (process.env.NODE_ENV === 'development')
                            console.log('VERIFICATION CODE: ', code);

                        EmailService.sendActivationEmail(user, code);

                        res.json({
                            status: 'success',
                            message: "Foi enviado um código de verificação para o seu email. Você tem até 24 horas para ativar sua conta.",
                            signup_token: token
                        });
                    })
                    .catch(handles.handleServerError(res));
                });
            })
            .catch(err => {
                if (err.errors) {
                    const emailAlreadyExists = err.errors.some(error => {
                        return error.validatorKey === 'not_unique' && error.path === 'email';
                    });
    
                    if (emailAlreadyExists) {
                        return res.status(403).json({
                            status: 'error',
                            ...responses.errors.emailAlreadyUsed
                        });
                    }
                }

                handles.handleServerError(res)(err);
            });
        });
    },
    resendCode(req, res) {
        Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(403).json({
                    status: 'error',
                    ...responses.errors.authenticationFailed
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err)
                    return handles.handleServerError(res)();

                if (result === true) {
                    const code = _generateVerificationCode();
                    const tokenData = {
                        id: generateId(),
                        code,
                        userId: user.id.toString()
                    };

                    jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            return handles.handleServerError(res)();
                        }

                        TokenBlacklist.create({
                            id: tokenData.id,
                            token,
                            type: 'signup',
                            attempts: 0
                        })
                        .then(() => {
                            if (process.env.NODE_ENV === 'development')
                                console.log('VERIFICATION CODE: ', code);

                            EmailService.sendActivationEmail(user, code);

                            res.json({
                                status: 'success',
                                message: "Foi enviado um código de verificação para o seu email. Você tem até 24 horas para ativar sua conta.",
                                signup_token: token
                            });
                        })
                        .catch(handles.handleServerError(res));
                    });
                } else {
                    res.status(403).json({
                        status: 'error',
                        ...responses.errors.authenticationFailed
                    });
                }
            });
        })
        .catch(handles.handleServerError(res));
    },
    recoverPassword(req, res) {
        const email = req.body.email;

        Users.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    ...responses.errors.noUserFound
                });
            }

            const tokenData = {
                id: generateId(),
                userId: user.id.toString(),
            };

            jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                if (err) {
                    return handles.handleServerError(res)();
                }

                TokenBlacklist.create({
                    id: tokenData.id,
                    token,
                    type: 'recover',
                    attempts: 0
                })
                .then(() => {
                    const recoveryLink = `http://${process.env.HOST}/api/user/recover-password?token=${token}`;
                    if (process.env.NODE_ENV === 'development')
                        console.log('RECOVER LINK: ', recoveryLink);

                    EmailService.sendPasswordRecoveryEmail(user, recoveryLink);

                    res.json({
                        status: 'success',
                        message: "Foi enviado um link de recuperação de senha para o seu email. Você tem até 24 horas para recuperar sua senha."
                    });
                })
                .catch(handles.handleServerError(res));
            });
        })
        .catch(handles.handleServerError(res));
    },
    recoverPasswordPage(req, res) {
        res.sendFile(path.resolve(__dirname, 'views', 'recover-password.html'));
    },
    updatePassword(req, res) {
        Users.findOne({
            where: {
                id: req.tokenData.userId
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    ...responses.errors.noUserFound
                });
            }

            bcrypt.hash(req.body.new_password, config.BCRYPT_SALT_ROUNDS, (err, hash) => {
                if (err) {
                    return handles.handleServerError(res)();
                }

                user.set('password', hash).save()
                .then(() => {
                    res.json({
                        status: 'success',
                        userId: req.tokenData.userId
                    });
                })
                .catch(handles.handleServerError(res));
            });
        })
        .catch(handles.handleServerError(res));
    },
    login(req, res) {
        Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(403).json({
                    status: 'error',
                    ...responses.errors.authenticationFailed
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err)
                    return handles.handleServerError(res)();
                
                if (result === true) {
                    const tokenData = {
                        id: generateId(),
                        userId: user.id.toString()
                    };

                    jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
                        if (err)
                            return handles.handleServerError(res)();

                        TokenBlacklist.create({
                            id: tokenData.id,
                            token,
                            type: 'access'
                        })
                        .then(() => {
                            res.json({
                                status: 'success',
                                userId: user.id,
                                access_token: token
                            });
                        })
                        .catch(handles.handleServerError(res));
                    });
                } else {
                    res.status(403).json({
                        status: 'error',
                        ...responses.errors.authenticationFailed
                    });
                }
            });
        })
        .catch(handles.handleServerError(res));
    },
    logout(req, res) {
        TokenBlacklist.destroy({
            where: {
                id: req.tokenData.id
            }
        })
        .then(() => {
            res.json({
                status: 'success',
                message: 'Usuário saiu da sessão.'
            });
        })
        .catch(handles.handleServerError(res));
    },
    update(req, res) {
        const userId = req.params.userId;

        if (userId === req.tokenData.userId) {
            Users.update({
                ...req.body
            }, {
                where: {
                    id: userId
                }
            })
            .then(([affected]) => {
                if (affected === 0) {
                    return res.status(404).json({
                        status: 'error',
                        ...responses.errors.noUserFound
                    });
                }
    
                res.json({
                    status: 'success',
                    userId: userId
                });
            })
            .catch(handles.handleServerError(res));
        } else {
            res.status(403).json({
                status: 'error',
                ...responses.errors.accessDenied
            });
        }
    },
    destroy(req, res) {
        const userId = req.params.userId;
        Users.destroy({
            where: {
                id: userId
            }
        })
        .then(destroyed => {
            if (destroyed === 0) {
                return res.status(404).json({
                    status: 'error',
                    ...responses.errors.noUserFound
                });
            }

            res.json({
                status: 'success',
                userId: userId
            });
        })
        .catch(handles.handleServerError(res));
    }
};
