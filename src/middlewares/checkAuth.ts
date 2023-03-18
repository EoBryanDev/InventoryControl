import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import IPayload from "../models/interfaces/auth/IPayload";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    //Access Token

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //check token
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

        req.user_id = sub;
        return next();
    } catch (error) {
        return res.send(401).end();
    }
}
