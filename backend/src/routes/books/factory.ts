import { ICreateBookRequestBody } from ".";
import faker from "../../_test/faker";


export function generateNewBook(): ICreateBookRequestBody {
	// TODO: Change default values for faker generated ones. This might result in changes needed to the validation methods
	return {
		titulo: faker.lorem.words(3),
		autor: faker.name.findName(),
		id_dono: faker.random.alphaNumeric(19)
	};
}
