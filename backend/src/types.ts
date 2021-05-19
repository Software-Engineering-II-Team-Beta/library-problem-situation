
export interface User {
	id: string;
	email: string;
	cpf: string;
	address: string;
	phoneNumber: string;
	password: string;
}


export type NewUser = Pick<User, Exclude<keyof User, "id">>
export interface Error {
	error: string;
}

export interface Pagination {
	token: string;
	numberPerPage: number;
}
