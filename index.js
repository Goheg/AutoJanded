import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import nodemailer from "nodemailer";
import {google} from "googleapis";
import {GoogleAuth} from "google-auth-library";

const app = express();
const port = 3000;

const SPREADSHEET_ID = "1c25BqnMNIwmVxf35IpLlC7ZdtcrDRscQzJstvW1a7us";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/cng", (req, res) => {
  res.sendFile(__dirname + "/public/cng.html");
});

app.get("/vehicleSales&outsourcing", async (req, res) => {
  res.sendFile(__dirname + "/public/vehiclesales.html");
});

app.post("/sales", async (req, res) => {
  console.log(req.body);

  const {
    name,
    email,
    phone,
    vehicleName,
    year,
    service,
    address,
    budget,
    upfront,
  } = req.body;

  const auth = new GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const sheet = google.sheets({version: "v4", auth});

  const values = [
    [name, email, phone, vehicleName, year, service, address, budget, upfront],
  ];

  const resource = {
    values,
  };

  try {
    await sheet.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "VehicleSales!A:I", // Adjust according to your sheet structure
      valueInputOption: "RAW",
      resource,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samueltrust00@gmail.com",
      pass: "tpganykznccpbsso",
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
          Vehicle Name: ${vehicleName}
          Car Year: ${year}
          Service: ${service}
          Address: ${address}
          Budget: ${budget}
          Upfront: ${upfront}
        `, // Plain text body
    html: `
         <h1 style="color: #2c3e50; font-family: Arial, sans-serif; border-bottom: 2px solid #3498db; padding-bottom: 5px;">New Sales Service Request</h1>
  <p style="font-size: 16px; color: #333;"><strong>Name:</strong> <span style="color: #555;">${name}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Email:</strong> <span style="color: #555;">${email}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Phone:</strong> <span style="color: #555;">${phone}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Vehicle Name:</strong> <span style="color: #555;">${vehicleName}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Car Year:</strong> <span style="color: #555;">${year}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Service:</strong> <span style="color: #555;">${service}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Address:</strong> <span style="color: #555;">${address}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Budget:</strong> <span style="color: #555;">${budget}</span></p>
  <p style="font-size: 16px; color: #333;"><strong>Upfront:</strong> <span style="color: #555;">${upfront}</span></p>

        `, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // res.status(500).send('Error sending email');
    } else {
      console.log("Email sent:", info.response);
      // res.render("index.ejs")
      // res.status(200).send('Email sent successfully');
      res.redirect("/");
    }
  });
});

app.post("/cngservice", async (req, res) => {
  console.log(req.body);

  const {
    name,
    email,
    phone,
    vehicleName,
    year,
    service,
    address,
    date,
    message,
  } = req.body;

  const auth = new GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const sheet = google.sheets({version: "v4", auth});

  const values = [
    [name, email, phone, vehicleName, year, service, address, date, message],
  ];

  const resource = {
    values,
  };

  try {
    await sheet.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "CNG!A:I", // Adjust according to your sheet structure
      valueInputOption: "RAW",
      resource,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samueltrust00@gmail.com",
      pass: "tpganykznccpbsso",
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
        Vehicle Name: ${vehicleName}
        Car Year: ${year}
        Service: ${service}
        Address: ${address}
        Date: ${date}
        Message: ${message}
      `, // Plain text body
    html: `
       <h1 style="color: #2c3e50; font-family: Arial, sans-serif; border-bottom: 2px solid #3498db; padding-bottom: 5px;">New Sales Service Request</h1>
<p style="font-size: 16px; color: #333;"><strong>Name:</strong> <span style="color: #555;">${name}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Email:</strong> <span style="color: #555;">${email}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Phone:</strong> <span style="color: #555;">${phone}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Vehicle Name:</strong> <span style="color: #555;">${vehicleName}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Car Year:</strong> <span style="color: #555;">${year}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Service:</strong> <span style="color: #555;">${service}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Address:</strong> <span style="color: #555;">${address}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Date:</strong> <span style="color: #555;">${date}</span></p>
<p style="font-size: 16px; color: #333;"><strong>Message:</strong> <span style="color: #555;">${message}</span></p>

      `, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // res.status(500).send('Error sending email');
    } else {
      console.log("Email sent:", info.response);
      // res.render("index.ejs")
      // res.status(200).send('Email sent successfully');
      res.redirect("/");
    }
  });
});

app.post("/booking", async (req, res) => {
  console.log(req.body);
  const name = req.body.client_name;
  const email = req.body.client_email_address;
  const phone = req.body.client_phone;
  const service = req.body.service;
  const message = req.body.message;

  console.log(name + " " + email + " " + phone + " " + service);

  const auth = new GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const sheet = google.sheets({version: "v4", auth});

  const values = [[name, email, phone, service, message]];

  const resource = {
    values,
  };

  try {
    await sheet.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "GeneralRequest!A:E", // Adjust according to your sheet structure
      valueInputOption: "RAW",
      resource,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samueltrust00@gmail.com",
      pass: "tpganykznccpbsso",
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
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // res.status(500).send('Error sending email');
    } else {
      console.log("Email sent:", info.response);
      // res.render("index.ejs")
      // res.status(200).send('Email sent successfully');
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
