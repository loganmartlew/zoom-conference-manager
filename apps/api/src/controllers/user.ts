import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  return res.json({ message: 'Create User' });
};

export const getUser = async (req: Request, res: Response) => {
  return res.json({ message: 'Get User' });
};

export const updateUser = async (req: Request, res: Response) => {
  return res.json({ message: 'Update User' });
};

export const deleteUser = async (req: Request, res: Response) => {
  return res.json({ message: 'Delete User' });
};
