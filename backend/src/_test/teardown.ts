import getTestId from "./testId";

const teardown = (): void => {
	console.log(`Ended test ${getTestId()}`);
	process.exit(0);
};

export default teardown;
