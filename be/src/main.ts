// tslint:disable: no-duplicate-string variable-name

// MARK: Express
import express = require("express");
import cors = require("cors");

// MARK: Swagger
import * as swaggerUi from "swagger-ui-express";
import YAML = require("yamljs");

// MARK: DB
import * as admin from "firebase-admin";

admin.initializeApp({
	credential: admin.credential.cert(require("./fbpkey.json")),
});

// MARK: Implementation
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

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
