// MARK: Types
import { Book, NewBook, EditBook } from "../../types";

// MARK: bcrypt
import { inspect } from "util";

import * as jwt from "../auth/jwt";

// MARK: Express
import express = require("express");
import { validatewNewBook, validateBookDetails } from "./validators";
import { getDatabaseRef } from "../../database";

import { IError } from "../../types";
const router = express.Router();

// MARK: Methods
export interface ICreateBookRequestBody {
	titulo: string;
	autor: string;
	id_dono: string;
}


export interface ICreateBookSuccesfulResponse {
	book: Book;
	token: string;
}

export type ICreateBookResponseBody = IError | ICreateBookSuccesfulResponse;

router.post("/", async (req: express.Request<{}, ICreateBookResponseBody, ICreateBookRequestBody>, res: express.Response<ICreateBookResponseBody>) => {
	const newBook: NewBook = {
		titulo: req.body.titulo,
		autor: req.body.autor,
		id_dono: req.body.id_dono,
	};

	const errorValidateNewBook = validatewNewBook(newBook);

	if (!!errorValidateNewBook) {
		res.status(400).send({ error: errorValidateNewBook });
		return;
	}

	try {
		const ref = getDatabaseRef("books");
		const bookRef = ref.push();


		const newBookRef = bookRef.push();

		if (newBookRef.key === null) {
			throw new Error("Chave de novo livro não foi criada");
		}

		const book: Book = {
			...newBook,
			id: newBookRef.key,
		};

		newBookRef.set(book);
		await newBookRef.set(book);
		const bookData: Book = (await newBookRef.get()).val();
		res.send({book: bookData, token: jwt.sign(newBookRef.key)});
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

interface IEditBookRequestParams {
	bookId: string;
}
interface IEditBookRequestBody {
	titulo: string;
	autor: string;
	id_dono: string;
}


type IEditBookResponseBody = IError | Book;

router.patch("/:bookId", async (req: express.Request<IEditBookRequestParams, IEditBookResponseBody, IEditBookRequestBody>, res: express.Response<IEditBookResponseBody>) => {
	const editBook: EditBook = {
		titulo: req.body.titulo,
		autor: req.body.autor,
		id_dono: req.body.id_dono,
	};

	const errorValidateEditBook = await validateBookDetails(editBook, req.params.bookId);

	if (!!errorValidateEditBook) {
		res.status(400).send({ error: errorValidateEditBook });
		return;
	}



	try {
		const ref = getDatabaseRef("books");
		const booksRef = ref.child(req.params.bookId);

		await booksRef.update(editBook);

		res.send((await booksRef.get()).val());
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

interface IEditBookRequestParams {
	bookId: string;
}

type IDeleteBookResponseBody = IError;

router.delete("/:bookId", async (req: express.Request<IEditBookRequestParams, IDeleteBookResponseBody, {}>, res: express.Response<IDeleteBookResponseBody>) => {
	try {
		const ref = getDatabaseRef("books");
		const bookssRef = ref.child(req.params.bookId);

		await bookssRef.update({ deletedAt: new Date() });
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

export default router;


