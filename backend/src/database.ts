// MARK: DB
import * as admin from "firebase-admin";
import testId from "./_test/testId";

export function getDatabaseRef(ref: string = "") {
	const database = admin.database();
	const testPrefix = !!process.env.TEST ? `test/${testId}/` : "";

	return database.ref(`${testPrefix}${ref}`);
}
