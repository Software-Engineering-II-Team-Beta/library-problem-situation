// MARK: Database
import { isPasswordValid } from ".";

// MARK: Implementation
test("Check if small password is invalid", async (done) => {
	expect(isPasswordValid("123")).toEqual(false);
	done();
});

test("Check if 6 digits password is valid", async (done) => {
	expect(isPasswordValid("123456")).toEqual(true);
	done();
});
