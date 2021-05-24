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
	const db = admin.database();

	try {
		const pingSnapshot = await db.ref("ping").get();

		res.send({ ok: pingSnapshot.val() });
	} catch (err) {
		res.status(500).send({ ok: false });
	}
});

// MARK: Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/books", booksRouter);
// MARK: Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MARK: Start Server
const port = 8000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
