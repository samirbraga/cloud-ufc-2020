const responses = {
    'pt-br': {
        errors: {
            serverFailed: {
                type: 'serverFailed',
                message: 'Um erro interno ocorreu em nosso sistema. Por favor, tente novamente.'
            },
            noUserFound: {
                type: 'noUserFound',
                message: 'Usuário não encontrado.'
            },
            noRoleFound: {
                type: 'noRoleFound',
                message: 'Função não encontrada.'
            },
            noTagFound: {
                type: 'noTagFound',
                message: 'Tag não encontrada.'
            },
            noQuizFound: {
                type: 'noQuizFound',
                message: 'Quiz não encontrado.'
            },
            noNewsFound: {
                type: 'noNewsFound',
                message: 'Notícia não encontrada.'
            },
            noSpecialtyFound: {
                type: 'noSpecialtyFound',
                message: 'Especialidade não encontrada.'
            },
            noEducationFound: {
                type: 'noEducationFound',
                message: 'Nível de escolaridade não encontrado.'
            },
            alreadyConfirmedUser: {
                type: 'alreadyConfirmedUser',
                message: 'Usuário já confirmado.'
            },
            expiredSignupSession: {
                type: 'expiredSignupSession',
                message: 'Sessão expirada. Solicite um novo código de confirmação.'
            },
            emailAlreadyUsed: {
                type: 'emailAlreadyUsed',
                message: 'O e-mail informado já foi cadastrado.'
            },
            authenticationTrouble: {
                type: 'authenticationTrouble',
                message: 'O acesso não foi permitido devido a um problema de autenticação.'
            },
            authenticationFailed: {
                type: 'authenticationFailed',
                message: 'Algum dos dados informados está incorreto.'
            },
            wrongVerificationCode: {
                type: 'wrongVerificationCode',
                message: 'O código informado está incorreto.'
            },
            maxSignupAttemptsReached: {
                type: 'maxSignupAttemptsReached',
                message: 'Você atingiu o número máximo de tentativas. Solicite um novo código de confirmação.'
            },
            accessDenied: {
                type: 'accessDenied',
                message: 'Você não tem permissão para acessar os dados do usuário. Faça login na sua conta.'
            },
            badFields: {
                type: 'badFields',
                message: 'As informações informadas não estão corretas.'
            },
            noFields: {
                type: 'noFields',
                message: 'Nenhum campo informado.'
            },
            fieldMissed: {
                type: 'fieldMissed',
                message: `O campo '$1' é obrigatório.`
            }
        }
    }
};

module.exports = responses;
