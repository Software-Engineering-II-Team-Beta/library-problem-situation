import * as admin from "firebase-admin";
import * as jwt from "./jwt"
import express = require("express");
import bcrypt = require("bcrypt");
import { User } from "../../types";
const router = express.Router();

export const authMiddleware = async (req: express.Request<{}>, res: express.Response<{}>, next: express.NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            res.status(401).send({"error": "Authorization header not defined"});
            return;
        }
        const [, token] = authHeader.split(' ');
        const decoded = jwt.verify(token);
        if(decoded instanceof Object) req.body.jwt = {...decoded, token: token};
        else req.body.jwt = {payload: decoded, iat: undefined, exp: undefined, token: token};
        next();
    }
    catch (err){
        res.status(401).send({"error": err})
    }
};

interface ILoginRequestBody {
    email: string, 
    password: string;
    jwt: jwt.jwtObject;
}

interface ISuccesfulLoginResponse {
    user: User;
    token: string;
}

type ILoginResponseBody = {
	error: string;
} | ISuccesfulLoginResponse;

router.post("/login", authMiddleware, async (req: express.Request<{}, ILoginResponseBody, ILoginRequestBody>, res: express.Response<ILoginResponseBody>) => {
    try{
        const email = req.body.email, password = bcrypt.hashSync(req.body.password, 10);
        const db = admin.database();
        const ref = db.ref("users/" + req.body.jwt.payload);
        if(ref.child('email').equalTo(email) && ref.child('password').equalTo(password)){
            const userData = (await ref.get()).val();
            delete userData.id;
            res.status(200).send({user: userData, token: req.body.jwt.token});
        }
        else{
            res.status(500).send({error: "Comparison with database failed"});
        }
    }
    catch (err){
        res.status(500).send({error:err});
    }
});
export default router;
