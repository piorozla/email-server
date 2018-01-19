const bodyParser = require('body-parser');
const config = require('./utils/config.json');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const providerEmailAddress = config.email;
const providerEmailAddressPassword = config.password;
console.log(providerEmailAddress, providerEmailAddressPassword);

const transporter = nodemailer.createTransport({
  host: 'poczta.o2.pl',
  port: 465,
  secure: true,
  auth: {
    user: providerEmailAddress,
    pass: providerEmailAddressPassword,
  },
});

const mailOptions = {
  from: 'piorozla@o2.pl',
  to: 'piorozla@gmail.com',
  subject: 'Sending Email using Node.js',
  html: 'That was easy!',
};

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
  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
