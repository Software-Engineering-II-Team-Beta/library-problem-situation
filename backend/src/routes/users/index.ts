// MARK: Types
import { User, NewUser, EditUser } from "../../types";

// MARK: bcrypt, jwt
import { inspect } from "util";
import bcrypt = require("bcrypt");
import * as jwt from "../auth/jwt";

import express = require("express");
import { validateNewUserDetails, validateUserDetails } from "./validators";
import { getDatabaseRef } from "../../database";
import { IError } from "../../types";

const router = express.Router();

// MARK: Methods
export interface ICreateUserRequestBody {
	email: string;
	cpf: string;
	address: string;
	phoneNumber: string;
	password: string;
}
export interface ICreateUserSuccesfulResponse {
	user: User;
	token: string;
}

export type ICreateUserResponseBody = IError | ICreateUserSuccesfulResponse;

router.post("/", async (req: express.Request<{}, ICreateUserResponseBody, ICreateUserRequestBody>, res: express.Response<ICreateUserResponseBody>) => {
	const newUser: NewUser = {
		email: req.body.email,
		cpf: req.body.cpf,
		address: req.body.address,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
	};

	const errorValidateNewUser = await validateNewUserDetails(newUser);

	if (!!errorValidateNewUser) {
		res.status(400).send({ error: errorValidateNewUser });
		return;
	}

	newUser.password = bcrypt.hashSync(newUser.password, 10);

	try {
		const ref = getDatabaseRef("users");
		const newUserRef = ref.push();

		if (newUserRef.key === null) {
			throw new Error("Chave de novo usuária não foi criada");
		}

		const user: User = {
			...newUser,
			id: newUserRef.key,
		};

		await newUserRef.set(user);
		const userData: User = (await newUserRef.get()).val();
		res.send({user: userData, token: jwt.sign(newUserRef.key)});
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

interface IEditUserRequestParams {
	userId: string;
}
interface IEditUserRequestBody {
	email: string;
	address: string;
	phoneNumber: string;
	password: string;
}

type IEditUserResponseBody = IError | User;

router.patch("/:userId", async (req: express.Request<IEditUserRequestParams, IEditUserResponseBody, IEditUserRequestBody>, res: express.Response<IEditUserResponseBody>) => {
	const editUser: EditUser = {
		email: req.body.email,
		address: req.body.address,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
	};

	const errorValidateEditUser = await validateUserDetails(editUser, req.params.userId);

	if (!!errorValidateEditUser) {
		res.status(400).send({ error: errorValidateEditUser });
		return;
	}

	editUser.password = bcrypt.hashSync(editUser.password, 10);

	// TODO: Verify if currentUser is the same as userId

	try {
		const ref = getDatabaseRef("users");
		const usersRef = ref.child(req.params.userId);

		await usersRef.update(editUser);

		res.send((await usersRef.get()).val());
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

interface IEditUserRequestParams {
	userId: string;
}

type IDeleteUserResponseBody = IError;

router.delete("/:userId", async (req: express.Request<IEditUserRequestParams, IDeleteUserResponseBody, {}>, res: express.Response<IDeleteUserResponseBody>) => {
	// TODO: Verify if currentUser is the same as userId

	try {
		const ref = getDatabaseRef("users");
		const usersRef = ref.child(req.params.userId);

		await usersRef.update({ deletedAt: new Date() });
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

export default router;
