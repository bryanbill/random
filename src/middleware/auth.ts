import { config } from '@/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).send('Unauthorized');
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        const payload = decodeJwt(token) as { id: number, email: string }
        if (typeof payload === 'string') {
            throw new Error('Invalid JWT payload');
        }

        req.user = {
            id: payload.id,
            email: payload.email,
        };

        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}

const decodeJwt = (token: string) => {
    if (config.Jwt.Secret === undefined) {
        throw new Error('JWT Secret is not defined');
    }

    const payload = jwt.verify(token, config.Jwt.Secret);
    return payload;
}

const encodeJwt = async (payload: any): Promise<String | undefined> => {
    if (config.Jwt.Secret === undefined || config.Jwt.ExpiresIn === undefined) {
        throw new Error('JWT Secret or ExpiresIn is not defined');
    }

    const token = await new Promise((resolve, reject) => {
        jwt.sign({}, config.Jwt.Secret!, {
            expiresIn: config.Jwt.ExpiresIn!,
        }, (err, encoded) => {
            if (err) {
                reject(err);
            }

            resolve(token);
        });
    });

    return token as string;
}

export {
    authMiddleware,
    decodeJwt,
    encodeJwt,
}