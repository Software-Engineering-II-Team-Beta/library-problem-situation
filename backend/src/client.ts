import axios from "axios";
import { Ping } from "./types";

export async function ping(): Promise<Ping> {
    const response = await axios.get("http://localhost:8000");
    return response.data;
}
