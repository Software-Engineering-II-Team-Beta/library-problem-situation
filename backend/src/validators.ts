import validator from "validator";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export function isEmailValid(email: string): boolean {
	return validator.isEmail(email);
}

export function isPasswordValid(password: string): boolean {
	const re = /^[A-Za-z0-9]{6,20}$/; // only alphanumeric passwords
	return re.test(password);
}

export function isCpfValid(cpf: string): boolean {
	return cpfValidator.isValid(cpf);
}

export function isAddressValid(address: string): boolean {
	const re = /^[A-Za-z0-9\.\,\s\°\º]{1,40}$/;
	return re.test(address);
}

export function isPhoneNumberValid(phoneNumber: string): boolean {
	const re = /^\+?\(?[0-9]{1,4}\)?[-\s\./0-9]{1,15}$/;
	return re.test(phoneNumber);
}
