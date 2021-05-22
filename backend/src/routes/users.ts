// MARK: Regex
import { emailRegex, passwordRegex, cpfRegex, addressRegex, phoneNumberRegex } from "./../regex";

// MARK: Types
import { User, NewUser } from "./../types";

// MARK: bcrypt
import { inspect } from "util";
import bcrypt = require("bcrypt");

// MARK: DB
import * as admin from "firebase-admin";

const express = require("express");
let router = express.Router();

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
router.post("/create", async (req: { body: { email: any; cpf: any; address: any; phoneNumber: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: any; }): void; new(): any; }; }; send: (arg0: User) => void; }) => {
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

module.exports = router;