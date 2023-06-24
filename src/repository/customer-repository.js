import Customer from "../model/customer-model.js";
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

const getAllCustomer = async () => {
  const customer = await Customer.findAll();
  return customer;
};

const createCustomer = async (pCustomer) => {
  try {
    // Check if user with provided email already exists
    const existingUser = await Customer.findOne({
      where: { email: pCustomer.email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    // Create new user if email does not exist
    const newCustomer = await Customer.create(pCustomer);

    const emailOptions = {
      from: "safolah.karimi@hicoder.ch",
      to: pCustomer.email,
      subject: "Hello",
      html: "Welcome to Dreamshop24",
    };
    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log("hello");
        console.error(err);
      } else console.log(info);
    });
    return newCustomer;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

// Get profile by mail
const getCustomerByEmail = async (pEmail) => {
  try {
    const user = await Customer.findOne({
      where: {
        email: pEmail,
      },
    });
    return user;
  } catch (error) {
    throw new Error("error while getting users");
  }
};

//Get users profile
const getUserProfile = async (pCustomerId) => {
  try {
    const customer = await Customer.findByPk(pCustomerId, {
      include: ["ShippingAddress"],
    });
    return customer;
  } catch (error) {
    throw new Error("Failed to retrieve user profile");
  }
};
//edit button profile
async function changeCustomerInfo(pCustomerId, { firstName, lastName, email }) {
  await Customer.update(
    { firstName, lastName, email },
    {
      where: {
        id: pCustomerId,
      },
    }
  );
}

const deleteCustomer = async (id) => {
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new Error(`Customer with id ${id} does not exist`);
    }
    await Customer.destroy();
    return Customer;
  } catch (error) {
    throw error;
  }
};
//contact us page
const contactUsSendEmail = async (pUserData) => {
  try {
    const emailOptions = {
      from: pUserData.email,
      to: "safolah.karimi@hicoder.ch",
      subject: "new content from submition",
      html: `
            <p>Name: ${pUserData.name}</p>
            <p>Email: ${pUserData.email}</p>
            <p>Phone: ${pUserData.phone}</p>
            <p>Message: ${pUserData.message}</p>
          `,
    };
    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log("hello");
        console.error(err);
      } else console.log(info);
    });
    // send automatic response to user
    const autoResponseOptions = {
      from: "safolah.karimi@hicoder.ch",
      to: pUserData.email,
      subject: "Thank you for your email",
      html: "<p>Thank you for contacting us. We will respond as soon as possible.</p>",
    };

    await transporter.sendMail(autoResponseOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
};
export default {
  getAllCustomer,
  getCustomerByEmail,
  createCustomer,
  changeCustomerInfo,
  deleteCustomer,
  contactUsSendEmail,
  getUserProfile,
};
