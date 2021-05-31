import {client} from "../index";

export async function _currentUser() {
  return await client.get("/auth/currentUser", {});
};

export async function _login({email, password}) {
  return await client.post("/auth/login",
    {
      email: email,
      password: password
    }
  );
};

export async function _logout() {
  return await client.post("/auth/logout", {});
};
