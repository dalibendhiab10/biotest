import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AppDataSource } from "../index";
import { Biologiste } from "../entities/biologiste";


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   
    if (!token) {
       
        return res.status(401).json({error:"Token is missing"});

    }

    jwt.verify(token, process.env.JWT_SECRET as string , (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.sendStatus(403);
        }
        (req as any).biologiste = user;
        
        next();
    });
};

