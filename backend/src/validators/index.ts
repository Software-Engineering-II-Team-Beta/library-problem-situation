// MARK: Libraries
import validator from "validator";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

// MARK: Methods
export function isEmailValid(email: string): boolean {
	return validator.isEmail(email);
}

export function isPasswordValid(password: string): boolean {
	return validator.isStrongPassword(password);
}

export function isCpfValid(cpf: string): boolean {
	return cpfValidator.isValid(cpf);
}

export function isAddressValid(address: string): boolean {
	const re = /^[A-Za-z0-9\.\,\s\°\º]{1,40}$/;
	return re.test(address);
}

export function isPhoneNumberValid(phoneNumber: string): boolean {
	return validator.isMobilePhone(phoneNumber);
}
