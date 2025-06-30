import axios from "axios";

const instance = axios.create({
  baseURL: "https://style-hive-2.onrender.com/api", // your deployed backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
