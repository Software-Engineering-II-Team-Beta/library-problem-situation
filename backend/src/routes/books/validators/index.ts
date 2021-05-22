// MARK: Types
import { NewBook } from "../../../types";

// MARK: Methods
export function validatewNewBook(newBook: NewBook): string | null {
	if (!(newBook.titulo)) {
		return "Título inserido não é válido.";
	}

	if (!(newBook.autor)) {
		return "Descrição inserida não é válida.";
	}

	return null;
}
