import { ping } from "./client";

describe("Test base routes", () => {
	it("should return ok: true for /ping", async () => {
		const response = await ping();

		expect(response).toEqual({ ok: true });
	});
});
