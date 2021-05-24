import { cpf } from "cpf-cnpj-validator";
import { ICreateUserRequestBody } from ".";
import faker from "../../_test/faker";

export function generateNewUser(): ICreateUserRequestBody {
	// TODO: Change default values for faker generated ones. This might result in changes needed to the validation methods
	return {
		address: "9080 Isabella Rodovia",
		cpf: cpf.generate(),
		email: faker.internet.email(),
		password: "123456",
		phoneNumber: "(63) 0726-8755",
	};
}
