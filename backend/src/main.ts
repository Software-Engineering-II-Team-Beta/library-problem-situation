// tslint:disable: no-duplicate-string variable-name

// MARK: Express
import express = require("express");
import cors = require("cors");

// MARK: Swagger
import * as swaggerUi from "swagger-ui-express";
import YAML = require("yamljs");

// MARK: DB
import * as admin from "firebase-admin";
import fbpKey = require("./fbpkey.json");

// MARK: Routes
import { default as authRouter } from "./routes/auth";
import { default as userRouter } from "./routes/users";
import { default as booksRouter } from "./routes/books";
import { default as groupsRouter } from "./routes/groups";
import { getDatabaseRef } from "./database";

// MARK: Initialize Firebase
admin.initializeApp({
	credential: admin.credential.cert(fbpKey as admin.ServiceAccount),
	...fbpKey,
});

// MARK: Express App
const app = express();

// MARK: Middlewares
app.use(cors());
app.use(express.json());

// Ping
interface IPingResponse {
	ok: boolean;
}

app.get("/", async (_, res: express.Response<IPingResponse>) => {
	try {
		const pingRef = getDatabaseRef("ping/");
		let pingSnapshot = await pingRef.get();

		if (!pingSnapshot.exists()) {
			await pingRef.set(true);
			pingSnapshot = await pingRef.get();
		}

		res.send({ ok: pingSnapshot.val() });
	} catch (err) {
		res.status(500).send({ ok: false });
	}
});

// MARK: Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/books", booksRouter);
app.use("/groups", groupsRouter);
// MARK: Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MARK: Start Server
const startServer = async (port = !process.env.TEST ? 8000 : 8010) => new Promise<void>((res) => {
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server listening on port ${port}`);
		res();
	});
});

const startServerPromise = startServer();
export default startServerPromise;
