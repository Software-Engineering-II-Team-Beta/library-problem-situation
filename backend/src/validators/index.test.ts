// MARK: Database
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { isCpfValid, isEmailValid, isPasswordValid, isPhoneNumberValid } from ".";
import faker from "../_test/faker";

// MARK: Implementation
describe("Test password validation", () => {
	it("should accept strong passwords", () => {
		expect(isPasswordValid("St#123456")).toEqual(true);
	});

	it("should reject small passwords", () => {
		expect(isPasswordValid("St#1")).toEqual(false);
	});

	it("should reject passwords without lowercase letters", () => {
		expect(isPasswordValid("S#12345678")).toEqual(false);
	});

	it("should reject passwords without uppercase letters", () => {
		expect(isPasswordValid("t#12345678")).toEqual(false);
	});
});

describe("Test email validation", () => {
	it("should accept valid email strings", () => {
		expect(isEmailValid("test@test.com")).toEqual(true);
	});

	it("should reject strings that are not emails", () => {
		expect(isEmailValid("test")).toEqual(false);
	});
});

describe("Test cpf validation", () => {
	it("should accept valid cpf strings", () => {
		expect(isCpfValid(cpfValidator.generate())).toEqual(true);
	});

	it("should reject strings that are not cpfs", () => {
		const cpf = cpfValidator.generate();
		expect(isCpfValid(cpf.slice(0, cpf.length - 2))).toEqual(false);
	});
});

describe("Test phone validation", () => {
	it("should accept valid phone strings", () => {
		expect(isPhoneNumberValid(faker.phone.phoneNumber("0165#######"))).toEqual(true);
	});

	it("should reject strings that are not phone numbers", () => {
		expect(isPhoneNumberValid("")).toEqual(false);
	});
});
