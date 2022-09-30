import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'teemo';
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ message: 'token not found' });
    }
    jwt.verify(authorization, JWT_SECRET);

    const decode = jwt.decode(authorization);
    // console.log(decode);

    res.locals.user = decode;
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' });
  }
  next();
};

export default validateToken;
