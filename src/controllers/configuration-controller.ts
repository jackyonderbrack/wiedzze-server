import userModel from '../models/user-model';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import bcrypt from 'bcrypt';

// Stwórzmy admina jeśli nie ma żadnych użytkowników (pierwsze uruchomienie)
export const createAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    const userCount = await userModel.countDocuments();

    if (!req.body.userPassword) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (userCount === 0) {
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
        const adminUser = new userModel({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: hashedPassword,
            isAdmin: true
        });
        await adminUser.save();
        Logging.info('Konto admina zostało stworzone');
        return res.status(200).json({ message: 'Konto admina zostało stworzone' });
    } else {
        Logging.error('Konto admina już istnieje');
        return res.status(400).json({ message: 'Konto admina już istnieje' });
    }
};
