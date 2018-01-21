const bodyParser = require('body-parser');
let config;
console.log(process.env.emailProvider)
if(!process.env.emailProvider) {
  config = require('./utils/config.json');
}
const express = require('express');
const nodemailer = require('nodemailer');
const { validateEmail, validateBody } = require('./utils/validate');

const app = express();
const port = process.env.PORT || 3000;
const emailProvider = process.env.emailProvider || config.emailProvider;
const emailProviderPassword = process.env.emailProviderPassword || config.emailProviderPassword;
const emailDestination = process.env.emailDestination || config.emailDestination;


app.use(bodyParser.json());


//set up email account that will send the emails
const transporter = nodemailer.createTransport({
  host: 'poczta.o2.pl',
  port: 465,
  secure: true,
  auth: {
    user: emailProvider,
    pass: emailProviderPassword,
  },
});

app.get('/', (req, res) => {
  res.send('Blank');
});

app.post('/', (req, res) => {
  const emailCheck = validateEmail(req.body.from);
  const bodyCheck = validateBody(req.body.body);
  let msg = '';

  if (emailCheck === 'valid' && bodyCheck === 'valid') {

    // configure email to send
    const mailOptions = {
      from: emailProvider,
      to: emailDestination,
      subject: req.body.subject,
      html: req.body.body,
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        msg = 'Could not send the email, please try again later.';
        res.status(400).send(msg);
      } else {
        console.log('Email sent: ' + info.response);
        msg = 'Email sent successfully';
        res.status(200).send(msg);        
      }
    });
  } else {
    if (emailCheck !== 'valid') {
      msg += emailCheck;
    }
    if (bodyCheck !== 'valid') {
      msg += bodyCheck;
    }
    res.status(400).send(msg);
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
