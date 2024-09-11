const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "monge",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/contactoForm", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    host: "host11.registrar-servers.com",
    port: 465,
    secure: true,
    auth: {
      user: "pacientes@mongeortopedia.com",
      pass: "R1ck@rd01",
    },
  });

  const mailOptions = {
    from: "pacientes@mongeortopedia.com",
    to: correo,
    cc: "pacientes@mongeortopedia.com",
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

app.post("/comments", (req, res) => {
  const { name, email, comment, blogId } = req.body;

  db.query(
    "INSERT INTO comentarios (nombre, correo, comentario, blog_id, estatus, fecha_creacion) VALUES (?,?,?,?, 'pendiente', NOW())",
    [name, email, comment, blogId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred: " + err.message);
      } else {
        res.status(200).send("Comment added successfully");
      }
    }
  );
});

app.get("/api/comments", (req, res) => {
  db.query("SELECT * FROM comentarios", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
