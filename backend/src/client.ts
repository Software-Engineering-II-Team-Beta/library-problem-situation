import axios from "axios";
import { IPing } from "./types";

export async function ping(): Promise<IPing> {
    const response = await axios.get("http://localhost:8000");
    return response.data;
}
