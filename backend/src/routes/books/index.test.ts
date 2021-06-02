import { exception } from "console";
import { createBook } from "./client";
import { generateNewBook } from "./factory";
import { generateNewUser } from "../users/factory"
import { createUser } from "../users/client";
import { login } from "../auth/client";

describe("Test books routes", () => {
	it("should be able to create new book", async () => {
		const newBook = generateNewBook();
		const newUser = generateNewUser();
		await createUser(newUser);
		const token = "basic " + (await login({ email: newUser.email, password: newUser.password })).token;
		const response = await createBook(newBook, token);

		expect(response.book.titulo).toEqual(newBook.titulo);
		expect(response.book.autor).toEqual(newBook.autor);
		expect(response.book.id_dono).toEqual(newBook.id_dono);
	});
	it("shouldn't be able to create new book", async () => {
		const newBook = generateNewBook();
		const newUser = generateNewUser();
		await createUser(newUser);
		const token = "basic " + (await login({ email: newUser.email, password: newUser.password })).token;
		newBook.autor = "";
		expect.assertions(1);
		try{
			const response = await createBook(newBook, token);
		} catch(err) {
			expect(err).toEqual("Autor é obrigatório.");
		}
		
		
	});
});
