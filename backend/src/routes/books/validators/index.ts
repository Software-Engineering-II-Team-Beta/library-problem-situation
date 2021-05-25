// MARK: Types
import { NewBook, EditBook } from "../../../types";

// MARK: Methods
export function validatewNewBook(newBook: NewBook): string | null {
	if (!(newBook.titulo)) {
		return "Título é obrigatório.";
	}

	if (!(newBook.autor)) {
		return "Autor é obrigatório.";
	}

	return null;
}

export async function validateBookDetails(newBook: NewBook | EditBook, bookId: string | null = null): Promise<string | null> {

	// TODO: Verify if another user is using the newUser.email
	// Ignore deleted users (soft delete at deletedAt)
	// const usersRef = getDatabaseRef("users");

	// usersRef.equalTo(newUser.email, "email")

	if (!(newBook.titulo)) {
		return "Título é obrigatório.";
	}

	if (!(newBook.autor)) {
		return "Autor é obrigatório.";
	}



	return null;
}
