import startServerPromise from "../main";
import getTestId from "./testId";

const setup = async (): Promise<void> => {
	await startServerPromise;

	console.log(`Starting test ${getTestId()}`);
};

export default setup;
