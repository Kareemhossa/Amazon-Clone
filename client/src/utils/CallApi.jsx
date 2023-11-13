import axios from "axios";
//Prouducts Data fron Json Files
const BASE_URL = "http://localhost:3005";

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

//Fetch data from the server  Products
export const callAPI = async (resource) => {
  const { data } = await axios.get(`${BASE_URL}/${resource}`, config);
  return data;
};
