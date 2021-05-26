import { createBook } from "./client";
import { generateNewBook } from "./factory";

describe("Test books routes", () => {
	it("should be able to create new book", async () => {
		const newBook = generateNewBook();

		const response = await createBook(newBook);

		expect(response.book.titulo).toEqual(newBook.titulo);
		expect(response.book.autor).toEqual(newBook.autor);
		expect(response.book.id_dono).toEqual(newBook.id_dono);
	});
});
