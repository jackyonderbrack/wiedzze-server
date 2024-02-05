import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';

const secretKey = process.env.JWT_SECRET || '';

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' });
        }
        const decoded = jwt.verify(token, secretKey) as { id: string };

        const user = await userModel.findById(decoded.id).select('-userPassword');
        if (!user) {
            return res.status(404).json({ message: 'Nie znaleziono użytkownika' });
        }
        res.json(user);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Nieprawidłowy token.' });
        } else {
            console.error('Błąd podczas weryfikacji tokenu:', error);
            return res.status(500).json({ message: 'Wewnętrzny błąd serwera.' });
        }
    }
};
