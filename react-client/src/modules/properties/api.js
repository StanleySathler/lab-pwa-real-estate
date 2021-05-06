import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/properties`;

export const findAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
