import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new Error('Token is missing');

  const [, token] = authHeader.split(' ');

  try {
    const { secret } = authConfig.jwt;

    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPaylod;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid Token');
  }
}