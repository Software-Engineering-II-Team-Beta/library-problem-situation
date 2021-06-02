import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:800",
    validateStatus: () => true,
});

export default client;
