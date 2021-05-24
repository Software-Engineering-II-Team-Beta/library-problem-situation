import { cpf } from "cpf-cnpj-validator";
import { ICreateUserRequestBody } from ".";
import faker from "../../_test/faker";

export function generateNewUser(): ICreateUserRequestBody {
	return {
		address: faker.address.streetAddress(),
		cpf: cpf.generate(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		phoneNumber: faker.phone.phoneNumber(),
	};
}
