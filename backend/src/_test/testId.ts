import * as admin from "firebase-admin";

let testId: string | null = null;

function getTestId(): string {
	if (!testId) {
		testId = admin.database().ref("test").push().key;
	}

	if (!testId) {
		throw new Error("Error initializing test id");
	}

	return testId;
}

export default getTestId;
