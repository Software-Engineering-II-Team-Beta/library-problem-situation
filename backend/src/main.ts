// tslint:disable: no-duplicate-string variable-name

// MARK: Express
import express = require("express");
import cors = require("cors");

// MARK: Swagger
import * as swaggerUi from "swagger-ui-express";
import YAML = require("yamljs");

// MARK: DB
import * as admin from "firebase-admin";

// MARK: Routes
import { default as userRouter } from "./routes/users";
import { default as booksRouter } from "./routes/books";

admin.initializeApp({
	credential: admin.credential.cert(require("./fbpkey.json")),
	databaseURL: "https://eng-soft-2021-default-rtdb.firebaseio.com/",
});

// MARK: Implementation
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/books", booksRouter);

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

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
