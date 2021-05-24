import startServerPromise from "../main";

const setup = async (): Promise<void> => {
	await startServerPromise;
	await new Promise<void>((res) => {
		setTimeout(() => {
			res();
		}, 2000);
	});
};

export default setup;
