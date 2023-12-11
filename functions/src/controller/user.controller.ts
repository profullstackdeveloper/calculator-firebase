import { Request, Response } from "express";
import { createUser } from "../db";

/// @name getUserByToken
/// @author Daniel Lee
/// @desc Returns user information by the IdToken of that user. Will be called when user signin with email and password.
/// @param {Request} req - There should be the user field in the request body if it pass through middleware.
/// @param {Response} res - Returns the email address, firstName and lastName as the object.
export const getUserByToken = async (req: Request, res: Response) => {
    const {email, firstName, lastName} = req.body.user;

    res.json({email, firstName, lastName});
}

/// @name signUp
/// @author Daniel Lee
/// @desc Create a new user in the DB and returns the information for that. Will be called when user sign up.
/// @param {Request} req - There should be the three fields in the request body: email, firstName, lastName
/// @param {Response} res - Returns the creation result.
export const signUp = async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;
    try {
        const result = await createUser({ email, createdAt: new Date().toDateString(), calcHistory: [], firstName, lastName });
        res.json(result);
    } catch (err) {
        res.status(500).json("Internal server error!");
    }
}