// tslint:disable: no-duplicate-string variable-name

// MARK: Express
import express = require("express");
import cors = require("cors");

// MARK: Swagger
import * as swaggerUi from "swagger-ui-express";
import YAML = require("yamljs");

// MARK: DB
import * as admin from "firebase-admin";

// MARK: Types
import { User, NewUser } from "./types";

// MARK: Regex
import { emailRegex, passwordRegex, cpfRegex, addressRegex, phoneNumberRegex } from "./regex";

// MARK: bcrypt
import bcrypt = require("bcrypt");
import { inspect } from "util";

admin.initializeApp({
	credential: admin.credential.cert(require("./fbpkey.json")),
	databaseURL: "https://eng-soft-2021-default-rtdb.firebaseio.com/",
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

// Criar usuario
function validateNewUser(newUser: NewUser): string | null {
	if (!emailRegex(newUser.email)) {
		return "Email inserido não é válido.";
	}

	if (!passwordRegex(newUser.password)) {
		return "Senha inserida não é válida.";
	}

	if (!cpfRegex(newUser.cpf)) {
		return "CPF inserido não é válido.";
	}

	if (!addressRegex(newUser.address)) {
		return "Endereço inserido não é válido";
	}

	if (!phoneNumberRegex(newUser.phoneNumber)) {
		return "Número de telefone inserido não é válido";
	}

	return null;
}
app.post("/users/create", async (req, res) => {
	const newUser: NewUser = {
		email: req.body.email,
		cpf: req.body.cpf,
		address: req.body.address,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
	};

	const errorValidateNewUser = validateNewUser(newUser);

	if (!!errorValidateNewUser) {
		res.status(400).send({ error: errorValidateNewUser });
	}

	newUser.password = bcrypt.hashSync(newUser.password, 10);

	try {
		const db = admin.database();
		const ref = db.ref();
		const usersRef = ref.child("users");
		const newUserRef = usersRef.push();

		if (newUserRef.key === null) {
			throw new Error("Chave de novo usuária não foi criada");
		}

		const user: User = {
			...newUser,
			id: newUserRef.key,
		};

		newUserRef.set(user);
		res.send(user);
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});
