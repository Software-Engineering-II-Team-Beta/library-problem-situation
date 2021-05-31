import {client} from "../index";

export async function _currentUser() {
  return await client.get("/auth/currentUser", {});
};

export async function _login(data) {
  return await client.post("/auth/login",
    {
      email: data.email,
      password: data.password
    }
  );
};

export async function _logout() {
  return await client.post("/auth/logout", {});
};
