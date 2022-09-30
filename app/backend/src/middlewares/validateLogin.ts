import { NextFunction, Request, Response } from 'express';
// import * as Joi from 'joi';

const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !regex.test(email)) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!password || password.length <= 6) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default validateLogin;
