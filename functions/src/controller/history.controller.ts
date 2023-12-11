import { Request, Response } from "express";
import { deleteHistory, getHistoryByEmail } from "../db";

export const getHistoryByUser = async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await getHistoryByEmail(user.email);

    res.json(result);
}

export const deleteHistoryForUser = async (req: Request, res: Response) => {
    const {user} = req.body;
    const {id} = req.params;
    
    const result = await deleteHistory(user.email, id);

    res.json({result});
}