// MARK: Types
import { User, NewUser } from "../../types";

// MARK: bcrypt
import { inspect } from "util";
import bcrypt = require("bcrypt");

// MARK: DB
import * as admin from "firebase-admin";

import express = require("express");
import { validateUserDetails } from "./validators";

const router = express.Router();

// MARK: Methods
interface ICreateUserRequestBody {
	email: string;
	cpf: string;
	address: string;
	phoneNumber: string;
	password: string;
}

type ICreateUserResponseBody = {
	error: string;
} | User;

router.post("/create", async (req: express.Request<{}, ICreateUserResponseBody, ICreateUserRequestBody>, res: express.Response<ICreateUserResponseBody>) => {
	const newUser: NewUser = {
		email: req.body.email,
		cpf: req.body.cpf,
		address: req.body.address,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
	};

	const errorValidateNewUser = await validateUserDetails(newUser);

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

export default router;
