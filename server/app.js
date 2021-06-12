const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

const mock = [
  { name: "Castillo", price: 300000 },
  { name: "Summerwind", price: 600000 },
  { name: "Casa Piña", price: 100000 },
];

app.use(cors());

app.get("/properties", (req, res) => {
  res.json(mock);
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
