// MARK: Database
import { isEmailValid, isPasswordValid } from ".";

// MARK: Implementation
describe("Test password validation", () => {
	it("should reject small passwords", () => {
		expect(isPasswordValid("123")).toEqual(false);
	});

	it("should accept password with 6 characters", () => {
		expect(isPasswordValid("123456")).toEqual(true);
	});
});

describe("Test email validation", () => {
	it("should reject strings that are not emails", () => {
		expect(isEmailValid("test")).toEqual(false);
	});

	it("should accept valid email strings", () => {
		expect(isEmailValid("test@test.com")).toEqual(true);
	});
});
