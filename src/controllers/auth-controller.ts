import userModel from '../models/user-model';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { identifier, password } = req.body;
        const user = await userModel.findOne({
            $or: [{ userName: identifier }, { userEmail: identifier }]
        });
        if (!user) {
            return Logging.error('Użytkownik nie znaleziony');
        }

        const isPasswordValid = await bcrypt.compare(password, user.userPassword);
        if (!isPasswordValid) {
            return Logging.error('Niepoprawne hasło');
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        Logging.error('Wystąpił błąd serwera');
    }
};
