const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "your_app_password"
  }
});

const sendTicketEmail = async (to, event, tickets) => {

  const mailOptions = {
    from: "Guta Events <youremail@gmail.com>",
    to: to,
    subject: "Your Guta Events Ticket 🎟",

    html: `
      <h2>Booking Confirmation</h2>

      <p>Your ticket has been successfully booked.</p>

      <h3>Event Details</h3>

      <p><b>Event:</b> ${event.title}</p>
      <p><b>Location:</b> ${event.location}</p>
      <p><b>Date:</b> ${event.event_date}</p>
      <p><b>Tickets:</b> ${tickets}</p>

      <br/>

      <p>Thank you for using Guta Events.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendTicketEmail;