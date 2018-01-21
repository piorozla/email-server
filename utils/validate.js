var validator = require('email-validator');

const validateEmail = email =>
  validator.validate(email)
    ? 'valid'
    : "The email address doesn't seem to be valid";

const validateBody = body => {
  let msg = '';
  if (typeof body === 'string' && body.length === 0) {
    msg += 'The content of the email cannot be empty';
  }
  if (typeof body === 'string' && body.length > 10000) {
    msg += 'The content of the email is too long (max 10000 characters)';
  }
  if (msg.length === 0) {
    msg = 'valid';
  }

  return msg;
};

module.exports = { validateEmail, validateBody };
