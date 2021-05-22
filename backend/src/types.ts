// MARK: Types
export interface User {
	id: string;
	email: string;
	cpf: string;
	address: string;
	phoneNumber: string;
	password: string;
}


export type NewUser = Pick<User, Exclude<keyof User, "id">>
export type EditUser = Pick<User, Exclude<keyof NewUser, "cpf">>
export interface Error {
	error: string;
}

export interface Book {
	id: string;
	titulo: string;
	autor: string;
	id_dono: string;
}


export type NewBook = Pick<Book, Exclude<keyof Book, "id">>
export interface Error {
	error: string;
}

export interface Pagination {
	token: string;
	numberPerPage: number;
}
