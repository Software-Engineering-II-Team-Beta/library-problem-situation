// MARK: Types
import { Book, NewBook } from "../../types";

// MARK: bcrypt
import { inspect } from "util";

// MARK: Express
import express = require("express");
import { validatewNewBook } from "./validators";
import { getDatabaseRef } from "../../database";
const router = express.Router();

// MARK: Methods
interface ICreateBookRequestBody {
	titulo: string;
	autor: string;
	id_dono: string;
}

type ICreateBookResponseBody = {
	error: string;
} | Book;

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
		const ref = getDatabaseRef();
		const bookRef = ref.child("books");
		const newBookRef = bookRef.push();

		if (newBookRef.key === null) {
			throw new Error("Chave de novo livro não foi criada");
		}

		const book: Book = {
			...newBook,
			id: newBookRef.key,
		};

		newBookRef.set(book);
		res.send(book);
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

export default router;
