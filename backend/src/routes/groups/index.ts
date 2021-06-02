// MARK: Types
import { Group, NewGroup, EditGroup, User } from "../../types";

// MARK: jwt
import { inspect } from "util";
import { decodeJwt } from "../auth/index";
import * as jwt from "../auth/jwt";

import express = require("express");
import { getDatabaseRef } from "../../database";
import { IError } from "../../types";

import { authMiddleware } from "../auth/index";
import { validateGroup } from "./validators";
const router = express.Router();

// MARK: Methods
export interface ICreateGroupRequestBody {
	nome: string;
}
export interface ICreateGroupSuccesfulResponse {
	group: Group;
	token: string;
}

export type ICreateGroupResponseBody = IError | ICreateGroupSuccesfulResponse;

router.post("/", authMiddleware, async (req: express.Request<{}, ICreateGroupResponseBody, ICreateGroupRequestBody>, res: express.Response<ICreateGroupResponseBody>) => {
	
	const newGroup: NewGroup = {
		nome: req.body.nome,
		members: {} 
	};
	if (!(await validateGroup(newGroup))) {
		res.status(500).send({ error: "Grupo com nome inválido." });
		return;
	}
	let data = await decodeJwt(req);
	if(!("payload" in data)){
		res.status(500).send({ error: "Token inválido."});
		return;
	}
	
	let userId = data['payload'] as string;
	newGroup.members[userId] = new Date().toLocaleString();
	
	try {
		const ref = getDatabaseRef("groups");
		const newGroupRef = ref.push();

		if (newGroupRef.key === null) {
			throw new Error("Chave do novo grupo não foi criada");
		}

		const group: Group = {
			...newGroup,
			id: newGroupRef.key,
		};

		await newGroupRef.set(group);
		const groupData: Group = (await newGroupRef.get()).val();
		res.send({group: groupData, token: jwt.sign(userId)});
	} catch (err) {
		res.status(500).send({ error: err.message || inspect(err) });
	}
});

export default router;
