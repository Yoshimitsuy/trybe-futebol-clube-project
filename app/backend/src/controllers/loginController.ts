import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  private service = new LoginService();

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = await this.service.login(email, password);
      return res.status(200).json({ token });
    } catch ({ message }) {
      // console.log(message);
      // console.log('log2_______________', email, password);

      return res.status(401).json({ message });
    }
  };

  validate = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;

    try {
      const role = await this.service.validate(userId);
      return res.status(200).json({ role });
    } catch ({ message }) {
      return res.status(404).json({ message });
    }
  };
}
export default LoginController;
