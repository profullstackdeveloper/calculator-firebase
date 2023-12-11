import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';
import { getUserByEmail } from "../db";

config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
});

/// @name authentication
/// @author Daniel Lee
/// @desc Middleware for the authentication purpose.
/// @param {Request} req - Request header should include the idToken.
/// @param {Response} res - If idToken is not verified, then it will returns 403 error code.
/// @param {NextFunction} next - If idToken is verified, then it will moves to the handler function.
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization?.split(' ');
    if(header) {
        const idToken = header[1];
        try {
            const decoded = await admin.auth().verifyIdToken(idToken);

            const user = await getUserByEmail((decoded as any)["email"]);
            if(user) {
                Object.assign(req.body, {user: user})
                next();
            } else {
                res.status(403).json({"message": "Forbidden: User not registered!"});
            }
        } catch (err) {
            console.error(err)
            res.status(401).json({"message": "UnAuthorized user."});
        }
    }
}