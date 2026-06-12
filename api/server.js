const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quartos", require("./src/routes/quartos.routes"));
app.use("/reservas", require("./src/routes/reservas.routes"));

app.listen(3000, () => {
  console.log("Servidor rodando");
});
