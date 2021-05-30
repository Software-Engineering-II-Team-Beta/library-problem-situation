import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8000",
    validateStatus: () => true,
});

export default client;
