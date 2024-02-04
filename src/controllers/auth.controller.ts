import userModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userLogin, userPassword } = req.body;
        const user = await userModel.findOne({ userName: userLogin });
        if (!user) {
            // Zmiana sposobu informowania o błędzie
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            // Zmiana sposobu informowania o błędzie
            return res.status(401).json({ message: 'Niepoprawne hasło' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'noJwtSecret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        Logging.error('Wystąpił błąd serwera');
        res.status(500).json({ message: 'Wystąpił błąd serwera' });
    }
};
