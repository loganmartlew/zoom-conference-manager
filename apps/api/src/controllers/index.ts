import { Request, Response } from "express";

export const apiTest = async (req: Request, res: Response) => {
    res.json({message:'Testing Api routing system'})
}