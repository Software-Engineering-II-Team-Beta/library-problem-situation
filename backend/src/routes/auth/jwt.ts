import jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "SqZ60qbcDJuxsgdSs1dzy6S2OAlWqomN";

export interface IJwtObject {
	payload: string;
	iat: number;
	exp: number;
	token: string;
}

export const sign = (payload: string) => jwt.sign({payload}, JWT_SECRET_KEY, { expiresIn: "7d" });
export const verify = (token: string) => jwt.verify(token, JWT_SECRET_KEY);
