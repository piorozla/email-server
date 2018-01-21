const bodyParser = require('body-parser');
const config = require('./utils/config.json');
const express = require('express');
const nodemailer = require('nodemailer');
const { validateEmail, validateBody } = require('./utils/validate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//get email details from config file
const providerEmailAddress = config.email;
const providerEmailAddressPassword = config.password;

//set up email account that will send the emails
const transporter = nodemailer.createTransport({
  host: 'poczta.o2.pl',
  port: 465,
  secure: true,
  auth: {
    user: providerEmailAddress,
    pass: providerEmailAddressPassword,
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
      from: providerEmailAddress,
      to: providerEmailAddress,
      subject: req.body.subject,
      html: req.body.body,
    };

    //send email
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    
    msg = 'Email sent successfully';
    res.status(200).send(msg);
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
