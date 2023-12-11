import { Request, Response } from "express";
import { deleteHistory, getHistoryByEmail } from "../db";

/// @name getHistoryByUser
/// @author Daniel Lee
/// @desc Returns the calculation history for user.
/// @param {Request} req - Request will include user property by passing middleware.
/// @param {Response} res - Returns the history for that user.
export const getHistoryByUser = async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await getHistoryByEmail(user.email);

    res.json(result);
}

/// @name getHistoryByUser
/// @author Daniel Lee
/// @desc Remove the calculation history for user.
/// @param {Request} req - Request will include user property by passing middleware.
/// @param {Response} res - Returns the result of deletion.
export const deleteHistoryForUser = async (req: Request, res: Response) => {
    const {user} = req.body;
    const {id} = req.params;
    
    const result = await deleteHistory(user.email, id);

    res.json({result});
}