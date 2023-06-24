import express from "express";
import customerRepository from "../repository/customer-repository.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "safolah.karimi@hicoder.ch",
    pass: process.env.GMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
  ignoreTLS: true,
});

const router = express.Router();
//get all customer
router.get("/", async (req, res, next) => {
  try {
    let customer = await customerRepository.getAllCustomer();
    return res.status(200).json(customer);
  } catch (error) {
    return next({ status: 404, message: error });
  }
});

// creat a new Customer
router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const newCustomer = await customerRepository.createCustomer(body);
    return res.send(newCustomer);
  } catch (error) {
    return next({ status: 500, message: error });
  }
});

// Get profile by mail
router.get("/profile/email/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await customerRepository.getCustomerByEmail(userEmail);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching users" });
  }
});
//Send Mail form our contact Form
router.post("/contact-form/send", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const emailOptions = {
      from: "safolah.karimi@hicoders.ch",
      to: email,
      subject: subject,
      html: `
        <p>Name: ${name}</p>
        <p>Message: ${message}</p>
      `,
    };

    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Failed to send email" });
      } else {
        console.log(info);
        return res.status(200).send({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to send email" });
  }
});
// The flowing code is also some with top code for the contact fomr
/* router.post("/contact-form/send", async (req, res) => {
  try {
    const { name, email, subject, message } = req.params.body;

    const emailOptions = {
      from: "safolah.karimi@hicoder.ch",
      to: email,
      subject: subject,
      html: ` <p>Name: ${name}</p>
    <p>Message: ${message}</p>`,
    };
    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log("hello");
        console.error(err);
      } else console.log(info);
    });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Can not send email" });
  }
});
 */
//Get users profile
router.get("/profile/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const user = await customerRepository.getUserProfile(customerId);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching users" });
  }
});

// update a customer
router.put("/:id", async (request, response) => {
  const customerId = request.params.id;
  const aCustomer = request.body;
  await customerRepository.changeCustomerInfo(customerId, aCustomer);
  response.status(200).json();
});

// delete a Customer

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedCustomer = await customerRepository.deleteCustomer(id);
    res.json(deletedCustomer);
  } catch (error) {
    next(error);
  }
});
// contact us send email
router.post("/send-email", async (req, res, next) => {
  try {
    const user = req.body;
    const userEmail = await customerRepository.contactUsSendEmail(user);
    return res.send(userEmail);
  } catch (error) {
    return next({ status: 500, message: error });
  }
});
export default router;
