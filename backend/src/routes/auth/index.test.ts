import { createUser } from "../users/client";
import { login } from "./client";
import { generateNewUser } from "../users/factory";

describe("Test auth routes", () => {
	it("should be able to login", async () => {
		const newUser = generateNewUser();
		await createUser(newUser);

		const response = await login({ email: newUser.email, password: newUser.password });

		expect(response.user.email).toEqual(newUser.email);
		expect(response.user.cpf).toEqual(newUser.cpf);
		expect(response.user.phoneNumber).toEqual(newUser.phoneNumber);
	});
	it("shouldn't be able to login", async () => {
		const newUser = generateNewUser();
		await createUser(newUser);
		newUser.password += '1';
		expect.assertions(1);
		try{
			const response = await login({ email: newUser.email, password: newUser.password });
		} catch (err) {
			expect(err).toEqual("Email e/ou senha incorretos");
		}
	});
});
