import { createUser } from "./client";
import { generateNewUser } from "./factory";

describe("Test users routes", () => {
	it("should be able to create new user", async () => {
		const newUser = generateNewUser();

		const response = await createUser(newUser);

		expect(response.user.email).toEqual(newUser.email);
		expect(response.user.cpf).toEqual(newUser.cpf);
		expect(response.user.phoneNumber).toEqual(newUser.phoneNumber);
	});
});
