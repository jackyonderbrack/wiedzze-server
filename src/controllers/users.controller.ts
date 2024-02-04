import { NextFunction, Request, Response } from 'express';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // jesli token jwt przesylamy jako barer token w naglowku authorization
        const token = req.headers.authorization?.split(' ')[1]; // pobieramy token
        if (!token) {
            return res.status(401).json({ message: 'Brak tokenu' });
        }

        // weryfikacja tokenu
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey') as { id: string };

        // pobieramy dane użytkownika (czyli id z tokenu)
        const user = await userModel.findById(decoded.id).select('-userPassword'); //wykluczamy hasło z odpowiedzi
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Nieprawidłowy token' });
        } else {
            return res.status(500).json({ message: 'Wystąpił błąd serwera' });
        }
    }
};
