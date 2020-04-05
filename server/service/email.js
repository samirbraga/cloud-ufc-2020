const Email = require('email-templates');
const path = require('path');

const activationEmail = new Email({
  message: {
    from: "Cloud Instagram - CI <xxxx-xxxx@gmail.com>"
  },
  transport: {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  }
});
const activationEmailTemplate = path.join(__dirname, './', 'email-templates', 'account-activation');
const passwordRecoveryEmailTemplate = path.join(__dirname, './', 'email-templates', 'password-recovery');

module.exports = {
  sendActivationEmail(user, code) {
    activationEmail.send({
      template: activationEmailTemplate,
      message: {
        to: `${user.first_name} ${user.last_name} <${user.email}>`,
        subject: "Código de Ativação de Conta"
      },
      locals: {
        firstname: user.first_name,
        code
      }
    })
    .catch(console.error);
  },
  sendPasswordRecoveryEmail(user, recoverylink) {
    activationEmail.send({
      template: passwordRecoveryEmailTemplate,
      message: {
        to: `${user.first_name} ${user.last_name} <${user.email}>`,
        subject: "Recuperação de Senha"
      },
      locals: {
        firstname: user.first_name,
        recoverylink
      }
    })
    .catch(console.error);
  }
}
