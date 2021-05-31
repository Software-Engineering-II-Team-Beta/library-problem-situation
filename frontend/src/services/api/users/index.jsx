import {client} from "../index";

export async function _getUsers(data) {
  return await client.get("/users",
    {
      token: data.token,
      numberPerPage: data.numberPerPage
    }
  );
};

export async function _createUser(data) {
  return await client.post("/users",
    {
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      address: data.address,
      phoneNumber: data.phoneNumber
    }
  );
};

export async function _getUser(userId) {
  return await client.get(`/users/${userId}`, {});
};

export async function _patchUser(userId, data) {
  return await client.patch(`/users/${userId}`,
    {
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      address: data.address,
      phoneNumber: data.phoneNumber
    }
  );
};

export async function _deleteUser(userId) {
  return await client.delete(`/users/${userId}`, {});
};
