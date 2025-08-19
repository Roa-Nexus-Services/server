const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const os = require("os");
const path = require("path");
const PDFDocument = require("pdfkit");
const printer = require("pdf-to-printer"); // ✅ librería correcta

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.post("/print", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).send("No se envió contenido");

    const tempFile = path.join(os.tmpdir(), `ticket_${Date.now()}.pdf`);
    const doc = new PDFDocument({ size: "A4", margin: 30 });
    const stream = fs.createWriteStream(tempFile);
    doc.pipe(stream);

    content.forEach(line => {
      let fontSize = 29; // predeterminado
      if (line.tag === 'h1') fontSize = 45;
      if (line.tag === 'h2') fontSize = 85;
      if (line.tag === 'h3') fontSize = 45;

      doc.fontSize(fontSize).text(line.text, { align: "center" }); // usar line.text, NO line
    });


    doc.end();

    stream.on("finish", async () => {
      try {
        await printer.print(tempFile, { printer: "2C-POS80-01-V6 Printer(2)" });
        fs.unlink(tempFile, () => { });
        res.send("Ticket enviado correctamente");
      } catch (err) {
        res.status(500).send("Error al imprimir: " + err.message);
      }
    });
  } catch (err) {
    res.status(500).send("Error del servidor: " + err.message);
  }
});


app.listen(PORT, () =>
  console.log(`Servidor local corriendo en http://localhost:${PORT}`)
);
