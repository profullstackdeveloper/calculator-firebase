import { Response, Request } from "express";
import { addHistory } from "../db";
// import { addHistory } from "../db";

export const addController = async (req: Request, res: Response) => {
    const { first, second, user }: any = req.body;
    console.log(req.body);
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