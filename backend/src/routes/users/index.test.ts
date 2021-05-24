import { cpf } from "cpf-cnpj-validator";
import faker from "../../_test/faker";
import { createUser } from "./client";

describe("Test users routes", () => {
	it("should be able to create new user", async () => {
		const newUser = {
			address: faker.address.streetAddress(),
			cpf: cpf.generate(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			phoneNumber: faker.phone.phoneNumber(),
		};

		const response = await createUser(newUser);

		expect(response.user.email).toEqual(newUser.email);
		expect(response.user.cpf).toEqual(newUser.cpf);
		expect(response.user.phoneNumber).toEqual(newUser.phoneNumber);
	});
});
