import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import nodemailer from "nodemailer";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.post("/booking", (req, res) => {
    console.log(req.body)
     const name = req.body.client_name;
     const email = req.body.client_email_address;
     const phone = req.body.client_phone;
     const service = req.body.service;
     const message = req.body.message;


     console.log(name + " " + email + " " + phone + " " + service)
    
        // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "samueltrust00@gmail.com",
          pass: "tpganykznccpbsso"
        },
      });
    
      const mailOptions = {
        from: "samueltrust00@gmail.com", // Sender address
        to: "samueltrust00@gmail.com", // Recipient address
        subject: `New Service Request from ${name}`, // Subject line
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Service: ${service}
          Message: ${message}
        `, // Plain text body
        html: `
          <h1>New Service Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
        `, // HTML body
      }
    
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          // res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          // res.render("index.ejs")
          // res.status(200).send('Email sent successfully');
          res.redirect("/")
          
        }
      });
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})