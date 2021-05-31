import {client} from "../index";

export async function _getBooks(data) {
  return await client.get("/books",
    {
      token: data.token,
      numberPerPage: data.numberPerPage
    }
  );
};

export async function _createBook(data) {
  return await client.post("/books",
    {
      titulo: data.titulo,
      autor: data.autor,
      id_dono: data.id_dono
    }
  );
};

export async function _getBook(bookId) {
  return await client.get(`/books/${bookId}`, {});
};

export async function _patchBook(bookId, data) {
  return await client.patch(`/books/${bookId}`,
    {
      titulo: data.titulo,
      autor: data.autor,
      id_dono: data.id_dono
    }
  );
};

export async function _deleteBook(bookId) {
  return await client.delete(`/books/${bookId}`, {});
};
