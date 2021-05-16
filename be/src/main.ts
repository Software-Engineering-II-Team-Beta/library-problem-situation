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
import {User} from "./types";

// MARK: Regex
import {emailRegex, passwordRegex, cpfRegex, addressRegex, phoneNumberRegex} from "./regex"

// MARK: bcrypt
import bcrypt = require("bcrypt");

admin.initializeApp({
	credential: admin.credential.cert(require("./fbpkey.json")),
	databaseURL: "https://eng-soft-2021-default-rtdb.firebaseio.com/"
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

//Criar usuario
app.post("/users/create", async (req, res) => {
	const data: User = {
		id: "", 
		email: req.body.email, 
		cpf: req.body.cpf, 
		address: req.body.address, 
		phoneNumber: req.body.phoneNumber, 
		password: req.body.password
	};
	//console.log(data);

	if(!emailRegex(data.email)){
		res.status(500).send({"error" : "Email inserido não é válido."});
		return;
	}

	if(!passwordRegex(data.password)){
		res.status(500).send({"error" : "Senha inserida não é válida."});
		return;
	}

	if(!cpfRegex(data.cpf)){
		res.status(500).send({"error" : "CPF inserido não é válido."});
		return;
	}

	if(!addressRegex(data.address)){
		res.status(500).send({"error" : "Endereço inserido não é válido"});
		return;
	}

	if(!phoneNumberRegex(data.phoneNumber)){
		res.status(500).send({"error" : "Número de telefone inserido não é válido"});
		return;
	}

	try {
		var db = admin.database();
		var ref = db.ref();
		var usersRef = ref.child("users");
		var newUser = usersRef.push();
		if(newUser.key != null)	data.id = newUser.key;
		else throw true;
		
		const saltRounds = 10;
		data.password = await new Promise((resolve, reject) => bcrypt.hash(data.password, saltRounds, (err, hash) => {
			if(err) reject(err);
			resolve(hash);
		}));
		newUser.set({
			...data
		});
		res.send({
			...data
		});

	} catch(err) {
		console.log(err);
		res.status(500).send({"error" : "Problema na criação de novo usuário."});
	}
});
