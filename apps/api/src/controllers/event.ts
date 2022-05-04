import { Request, Response } from 'express';


export const createEvent = async (req: Request, res: Response) => {
    return res.json({ message:'Create Event'});
}

export const getEvent = async (req: Request, res: Response) => {
    return res.json({ message:'Get Event'});
}

export const updateEvent = async (req: Request, res: Response) => {
    return res.json({ message:'Update Event'});
}

export const deleteEvent = async (req: Request, res: Response) => {
    return res.json({ message:'Delete Event'});
}