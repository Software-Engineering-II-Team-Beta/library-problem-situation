import { IPing } from "./types";
import client from "./_test/client";

export async function ping(): Promise<IPing> {
    const response = await client.get("http://localhost:8000");
    return response.data;
}
