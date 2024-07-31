import jwt, { SignOptions } from 'jsonwebtoken';

// function to sign JWT
export const signJWT = (payload: any, secret: string, options: SignOptions) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err: any, token: any) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

// function to verify JWT
export const verifyJWT = (token: string, secret: string) => {
    return new Promise<{ id: string; iat: number; exp: number }>(
        (resolve, reject) => {
            jwt.verify(token, secret, (err: any, decoded: any) => {
                if (err) reject(err);
                resolve(decoded);
            });
        }
    );
};
