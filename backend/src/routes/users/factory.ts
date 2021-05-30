import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { ICreateUserRequestBody } from ".";
import faker from "../../_test/faker";

import { generate } from "generate-password";

export function generateNewUser(): ICreateUserRequestBody {
	// TODO: Change default values for faker generated ones. This might result in changes needed to the validation methods
	return {
		address: "9080 Isabella Rodovia",
		cpf: cpfValidator.generate(),
		email: faker.internet.email(),
		password: generate({
			length: 10,
			numbers: true,
			symbols: true,
			uppercase: true,
			lowercase: true,
			strict: true,
		}),
		phoneNumber: faker.phone.phoneNumber("0165#######"),
	};
}
