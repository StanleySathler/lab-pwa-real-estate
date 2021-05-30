const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

const mock = [
  { name: "Apartamento em Santo Agostinho", price: 300000 },
  { name: "Cobertura em Santo Agostinho", price: 600000 },
  { name: "Mansão no Mangabeiras", price: 6000000 },
];

app.use(cors());

app.get("/properties", (req, res) => {
  res.json(mock);
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
