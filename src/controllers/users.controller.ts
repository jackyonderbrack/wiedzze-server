import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';

const secretKey = process.env.JWT_SECRET || 'noJwtSecret';

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {};
