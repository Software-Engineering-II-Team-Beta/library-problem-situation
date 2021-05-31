import * as jwt from "./jwt";
import express = require("express");
import bcrypt = require("bcrypt");
import { IError, User } from "../../types";
import { getDatabaseRef } from "../../database";
const router = express.Router();

export const decodeJwt = async (req: express.Request<{}>) : Promise<Object> => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new Error("Authorization header not defined");
	}

	const [, token] = authHeader.split(" ");
	let data = jwt.verify(token);
	if(typeof data === 'string' || data instanceof String){
		data = {payload: data};
	}
	return data;
};

export const getCurrentUserId = async (req: express.Request<{}>) : Promise<string> => {
	const data = await decodeJwt(req);
	if(!("payload" in data)){
		return "";
	}
	return data['payload'] as string;
}

export const getUserByEmail = async (email: string): Promise<User> => {
	const ref = getDatabaseRef("users");
	const query: object | null | undefined  = (await ref.orderByChild("email").equalTo(email).limitToFirst(1).get()).val();

	if (!query) {
		throw new Error("Email e/ou senha incorretos");
	}

	return Object.values(query)[0];
};

export const authMiddleware = async (req: express.Request<{}>, res: express.Response<{}>, next: express.NextFunction) => {
	try {
		if (!!decodeJwt(req)) {
			next();
		} else {
			throw new Error("Couldn't decode jwt token correctly.");
		}
	} catch (err) {
		res.status(401).send({ error: err });
	}
};

export interface ILoginRequestBody {
	email: string;
	password: string;
}

export interface ISuccesfulLoginResponse {
	user: User;
	token: string;
}

export type ILoginResponseBody = IError | ISuccesfulLoginResponse;

router.post("/login", async (req: express.Request<{}, ILoginResponseBody, ILoginRequestBody>, res: express.Response<ILoginResponseBody>) => {
	try {
		const email = req.body.email.trim();
		const password = req.body.password;

		const user: User = await getUserByEmail(email);

		if (!user || !bcrypt.compareSync(password, user.password)) {
			res.status(401).send({error: "Email e/ou senha incorretos"});
		} else {
			res.status(200).send({ user, token: jwt.sign(user.id) });
		}
	} catch (err) {
		res.status(500).send({ error: err });
	}
});

export type ICurrentUserResponseBody = ILoginResponseBody;

router.get("/currentUser", authMiddleware, async (req: express.Request<{}>, res: express.Response<ICurrentUserResponseBody>) => {
	try {
		const usersRef = getDatabaseRef("users");
		const userId = await getCurrentUserId(req);
		const user: User = (await usersRef.child(userId).get()).val();
		console.log(user);
		res.status(200).send({ user, token: jwt.sign(user.id)});
		
	} catch (err) {
		res.status(500).send({ error: err });
	}
});

export default router;
