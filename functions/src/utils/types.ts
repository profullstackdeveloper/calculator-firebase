export type CalcHistory = {
    first: number,
    second: number,
    operator: string,
    result: number,
    createdAt: string
}

export type User = {
    email: string;
    firstName: string,
    lastName: string,
    calcHistory: CalcHistory[],
    createdAt: string
}