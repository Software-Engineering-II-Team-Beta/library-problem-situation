// MARK: Validators
import { isEmailValid, isPasswordValid, isCpfValid, isAddressValid, isPhoneNumberValid } from "../../validators";

// MARK: Types
import { EditUser, NewUser } from "../../types";

// MARK: Methods
export async function validateUserDetails(newUser: NewUser | EditUser, userId: string | null = null): Promise<string | null> {
	if (!isEmailValid(newUser.email)) {
		return "Email inserido não é válido.";
	}

	// TODO: Verify if another user is using the newUser.email
	// Ignore deleted users (soft delete at deletedAt)
	// const db = admin.database();
	// const ref = db.ref();

	// ref.equalTo(newUser.email, "email")

	if (!isPasswordValid(newUser.password)) {
		return "Senha inserida não é válida.";
	}

	if (!isAddressValid(newUser.address)) {
		return "Endereço inserido não é válido";
	}

	if (!isPhoneNumberValid(newUser.phoneNumber)) {
		return "Número de telefone inserido não é válido";
	}

	return null;
}

export async function validateNewUserDetails(newUser: NewUser): Promise<string | null> {
	const userDetailsError = await validateUserDetails(newUser, null);

	if (!!userDetailsError) {
		return userDetailsError;
	}

	if (!isCpfValid(newUser.cpf)) {
		return "CPF inserido não é válido.";
	}

	return null;
}
