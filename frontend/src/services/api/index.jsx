import axios from "axios";

import * as auth from './auth';
import * as users from './users';
import * as book from './books';

export {auth, users, book};

export const client = axios.create({
  baseURL: "http://localhost:8000/",
});

export async function ping() {
  return await client.get("/", {});
};
