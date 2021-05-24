// MARK: DB
import * as admin from "firebase-admin";
import getTestId from "./_test/testId";

export function getDatabaseRef(ref: string = "") {
	const database = admin.database();
	const testPrefix = !!process.env.TEST ? `test/${getTestId()}/` : "";

	return database.ref(`${testPrefix}${ref}`);
}
