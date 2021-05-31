import {client} from "../index";

export async function _getBooks({token, numberPerPage}) {
  return await client.get("/books",
    {
      token: token,
      numberPerPage: numberPerPage
    }
  );
};

export async function _createBook({titulo, autor, id_dono}) {
  return await client.post("/books",
    {
      titulo: titulo,
      autor: autor,
      id_dono: id_dono
    }
  );
};

export async function _getBook(bookId) {
  return await client.get(`/books/${bookId}`, {});
};

export async function _patchBook(bookId, {titulo, autor, id_dono}) {
  return await client.patch(`/books/${bookId}`,
    {
      titulo: titulo,
      autor: autor,
      id_dono: id_dono
    }
  );
};

export async function _deleteBook(bookId) {
  return await client.delete(`/books/${bookId}`, {});
};
