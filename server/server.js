const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4321",
  })
);
app.post("/contacto", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    host: "host11.registrar-servers.com",
    port: 465,
    secure: true,
    auth: {
      user: "pacientes@mongeortopedista.com",
      pass: "8w%r.Di&x*1_",
    },
  });

  const mailOptions = {
    from: "pacientes@mongeortopedista.com",
    to: correo,
    // cc: "pacientes@mongeortopedista.com",
    subject: `Mensaje de ${nombre}`,
    text: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error occurred: " + error.message);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
