const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

const mock = [
  {
    place: "Santa Clara, California",
    price: "U$ 600000",
    features: "1000m² / 2 bedrooms / 2 parking",
    thumbnail:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    place: "Malibu, California",
    price: "U$ 800000",
    features: "800m² / 2 bedrooms / 2 parking",
    thumbnail:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80",
  },
];

app.use(cors());

app.get("/properties", (req, res) => {
  res.json(mock);
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
