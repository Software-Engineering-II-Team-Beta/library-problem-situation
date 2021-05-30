import { exception } from "console";
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
	it("shouldn't be able to create new book", async () => {
		const newBook = generateNewBook();
		newBook.autor = "";
		expect.assertions(1);
		try{
			const response = await createBook(newBook);
		} catch(err) {
			expect(err).toEqual("Autor é obrigatório.");
		}
		
		
	});
});
