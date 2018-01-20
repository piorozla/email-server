const validateEmail = email => {
  return 'valid';
};
const validateBody = body => {
  let msg = '';
  if (typeof body === 'string' && body.length === 0) {
    msg += '<p>The content of the email cannot be empty</p>';
  }
  if (typeof body === 'string' && body.length > 10000) {
    msg += '<p>The content of the email is too long (max 10000 characters)</p>';
  }
  if (msg.length === 0) {
    msg = 'valid';
  }

  return msg;
};

module.exports = { validateEmail, validateBody };
