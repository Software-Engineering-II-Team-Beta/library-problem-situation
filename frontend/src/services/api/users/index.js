import {client} from "../index";

export async function _getUsers({token, numberPerPage}) {
  return await client.get("/users",
    {
      token: token,
      numberPerPage: numberPerPage
    }
  );
};

export async function _createUser({email, password, cpf, address, phoneNumber}) {
  return await client.post("/users",
    {
      email: email,
      password: password,
      cpf: cpf,
      address: address,
      phoneNumber: phoneNumber
    }
  );
};

export async function _getUser(userId) {
  return await client.get(`/users/${userId}`, {});
};

export async function _patchUser(userId, {email, password, cpf, address, phoneNumber}) {
  return await client.patch(`/users/${userId}`,
    {
      email: email,
      password: password,
      cpf: cpf,
      address: address,
      phoneNumber: phoneNumber
    }
  );
};

export async function _deleteUser(userId) {
  return await client.delete(`/users/${userId}`, {});
};
