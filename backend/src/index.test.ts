import { ping } from "./client";

describe("Test base routes", () => {
	it("Test if ping route is working", async () => {
		const response = await ping();

		expect(response).toEqual({ ok: true });
	});
});
