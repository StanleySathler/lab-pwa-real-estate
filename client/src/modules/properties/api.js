import axios from "axios";

const baseUrl = "http://localhost:3001/properties";

export const findAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
