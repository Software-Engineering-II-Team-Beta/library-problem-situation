
// MARK: Types
import { Book, NewBook } from "./../types";

// MARK: bcrypt
import { inspect } from "util";


// MARK: DB
import * as admin from "firebase-admin";

const express = require("express");
const router = express.Router();

// Criar livro
function validatewNewBook(newBook: NewBook): string | null {
	if (!(newBook.titulo)) {
		return "Título inserido não é válido.";
	}

	if (!(newBook.autor)) {
		return "Descrição inserida não é válida.";
	}


	return null;
}
router.post("/create", async (req: { body: { titulo: any; autor: any; id_dono: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: any; }): void; new(): any; }; }; send: (arg0: Book) => void; }) => {
	const newBook: NewBook = {
		titulo: req.body.titulo,
		autor: req.body.autor,
        id_dono: req.body.id_dono
	};

	const errorValidateNewBook = validatewNewBook(newBook);

	if (!!errorValidateNewBook) {
		res.status(400).send({ error: errorValidateNewBook });
	}



	try {
		const db = admin.database();
		const ref = db.ref();
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



module.exports = router;