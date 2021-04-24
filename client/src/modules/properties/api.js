import axios from "axios";

const baseUrl = "http://localhost:3000/properties";
const mock = [
  { name: "Apartamento em Santo Agostinho", price: 300000 },
  { name: "Cobertura em Santo Agostinho", price: 600000 },
];

export const findAll = () => {
  // return axios.get(baseUrl);
  return Promise.resolve(mock);
};
