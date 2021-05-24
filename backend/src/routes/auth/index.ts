import * as admin from "firebase-admin";
import * as jwt from "./jwt"
import express = require("express");
import bcrypt = require("bcrypt");
import { User } from "../../types";
const router = express.Router();

export const decodeJwt = async (req: express.Request<{}>) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new Error("Authorization header not defined");
    }
    const [, token] = authHeader.split(' ');
    return jwt.verify(token);
};

export const getUserByEmail = async (email: string) : Promise<User> => {
    const db = admin.database();
    const ref = db.ref("users");
    const query: Object | null | undefined  = (await ref.orderByChild("email").equalTo(email).limitToFirst(1).get()).val();
    if(!query){
        throw new Error("Email não cadastrado.");
    }
    return Object.values(query)[0];
};

export const authMiddleware = async (req: express.Request<{}>, res: express.Response<{}>, next: express.NextFunction) => {
    try{
        if(!!decodeJwt(req)){
            next();
        }
        else{
            throw new Error("Couldn't decode jwt token correctly.");
        }
    }
    catch (err){
        res.status(401).send({"error": err})
    }
};

interface ILoginRequestBody {
    email: string, 
    password: string;
}

interface ISuccesfulLoginResponse {
    user: User;
    token: string;
}

type ILoginResponseBody = {
	error: string;
} | ISuccesfulLoginResponse;

router.post("/login", async (req: express.Request<{}, ILoginResponseBody, ILoginRequestBody>, res: express.Response<ILoginResponseBody>) => {
    try{
        const email = req.body.email.trim(), password = req.body.password;
        const user: User = await getUserByEmail(email);
        if(!user || !bcrypt.compareSync(password, user.password)){
            res.status(401).send({error: "Email e/ou senha incorretos"});
        }
        else{
            res.status(200).send({ user, token: jwt.sign(user.id) });
        }
    }
    catch (err){
        res.status(500).send({ error:err });
    }
});
export default router;
