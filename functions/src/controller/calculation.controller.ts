import { Response, Request } from "express";
import { addHistory } from "../db";

/// @name addController
/// @author Daniel Lee
/// @desc Handles multiply request
/// @param {Request} req - Should have two fields in the request body: first, second
/// @param {Response} res - Responds with calculation result
export const addController = async (req: Request, res: Response) => {
    const { first, second, user }: any = req.body;
    await addHistory(user.email, {
        first,
        second,
        operator: '+',
        result: Number(first + second),
        createdAt: new Date().toDateString()
    });
    res.json({
        result: Number(first + second),
    });
}

/// @name deductionController
/// @author Daniel Lee
/// @desc Handles multiply request
/// @param {Request} req - Should have two fields in the request body: first, second
/// @param {Response} res - Responds with calculation result
export const deductionController = async (req: Request, res: Response) => {
    const { first, second, user }: any = req.body;
    await addHistory(user.email, {
        first,
        second,
        operator: '-',
        result: Number(first - second),
        createdAt: new Date().toDateString()
    });
    res.json({
        result: Number(first - second),
    });
}

/// @name multiplyController
/// @author Daniel Lee
/// @desc Handles multiply request
/// @param {Request} req - Should have two fields in the request body: first, second
/// @param {Response} res - Responds with calculation result
export const multiplyController = async (req: Request, res: Response) => {
    const { first, second, user }: any = req.body;
    await addHistory(user.email, {
        first,
        second,
        operator: '*',
        result: Number(first * second),
        createdAt: new Date().toDateString()
    });
    res.json({
        result: Number(first * second),
    });
}

/// @name dividerController
/// @author Daniel Lee
/// @desc Handles divide request
/// @param {Request} req - Should have two fields in the request body: first, second
/// @param {Response} res - Responds with calculation result
export const dividerController = async (req: Request, res: Response) => {
    const { first, second, user }: any = req.body;
    await addHistory(user.email, {
        first,
        second,
        operator: '/',
        result: Number(first / second),
        createdAt: new Date().toDateString()
    });
    res.json({
        result: Number(first / second),
    });
}