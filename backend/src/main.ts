// tslint:disable: no-duplicate-string variable-name

// MARK: Express
import express = require("express");
import cors = require("cors");

// MARK: Swagger
import * as swaggerUi from "swagger-ui-express";
import YAML = require("yamljs");

// MARK: DB
import * as admin from "firebase-admin";

const users = require("./routes/users");
const books = require("./routes/books");

admin.initializeApp({
	credential: admin.credential.cert(require("./fbpkey.json")),
	databaseURL: "https://eng-soft-2021-default-rtdb.firebaseio.com/",
});

// MARK: Implementation
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/books", books);

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

// Ping
app.get("/", async (req, res) => {
	const db = admin.firestore();

	try {
		res.send((await db.collection("healthcheck").doc("ping").get()).data());
	} catch (err) {
		res.status(500).send({ ok: false });
	}
});

module.exports = app;