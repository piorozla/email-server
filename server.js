const bodyParser = require('body-parser');
const config = require('./utils/config.json');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const providerEmailAddress = config.email;
const providerEmailAddressPassword = config.password;

const transporter = nodemailer.createTransport({
  host: 'poczta.o2.pl',
  port: 465,
  secure: true,
  auth: {
    user: providerEmailAddress,
    pass: providerEmailAddressPassword,
  },
});


// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

app.get('/', (req, res) => {
  res.send('Blank');
});

app.post('/', (req, res) => {
  const mailOptions = {
    from: providerEmailAddress,
    to: providerEmailAddress,
    subject: req.body.subject,
    html: req.body.body,
  };
  console.log(mailOptions);

  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
