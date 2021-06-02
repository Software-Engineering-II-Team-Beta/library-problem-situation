import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8010",
    validateStatus: () => true,
});

export default client;
