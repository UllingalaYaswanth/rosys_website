const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Import mysql2/promise

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// SMTP configuration for Brevo
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587, // use 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: '75bfd8001@smtp-brevo.com', // Brevo username
    pass: 'm7O19GvntdEQTa2S'  // Brevo SMTP key
  }
});

// MySQL connection configuration
const dbConfig = {
  host: 'localhost', // MySQL host
  user: 'root', // MySQL username
  password: 'password', // MySQL password
  database: 'contactdb' // MySQL database name
};

// Route to handle form submission
app.post('/send_email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Insert form data into MySQL database
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO send_email (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    await connection.end();
    console.log('Form data saved to database', result.insertId);

    // Email options
    const mailOptions = {
      from: email, // sender address
      to: 'dinesh856143@gmail.com', // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: `<h2>Contact Form Submission</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong><br>${message}</p>` // html body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('Failed to send email.');
      }
      console.log('Message sent:', info.messageId);
      res.status(200).send('Email sent successfully!');
    });

  } catch (error) {
    console.error('Error saving form data to database', error);
    res.status(500).send('Failed to save form data to database.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
