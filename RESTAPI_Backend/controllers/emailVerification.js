const nodemailer = require("nodemailer");

const sendMail = (req, res) => {
  const { email, otp } = req.body;

  console.log("received email address", email)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "stackartz@gmail.com",
      pass: "mqph clis deei iczv",
    },
    from: "stackartz@gmail.com",
  });

  const mailOptions = {
    from: "stackartz@gmail.com",
    to: email,
    subject: "OTP verification for signUp",
    text: `Dear Customer,\n\nYour OTP for email verification at XYZ Company is: ${otp}\n\nPlease enter this OTP to verify your email address.\n\nThank you for shopping with XYZ Company!\n\nBest Regards,\nXYZ Company Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email." });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully." });
    }
  });
  //   res.send("done");
};

module.exports = { sendMail };
