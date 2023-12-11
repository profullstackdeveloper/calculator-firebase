import { Request, Response } from "express";
import { createUser } from "../db";

export const getUserByToken = async (req: Request, res: Response) => {
    const {email, firstName, lastName} = req.body.user;

    res.json({email, firstName, lastName});
}

export const signUp = async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;
    try {
        const result = await createUser({ email, createdAt: new Date().toDateString(), calcHistory: [], firstName, lastName });
        res.json(result);
    } catch (err) {
        res.status(500).json("Internal server error!");
    }
}