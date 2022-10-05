import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const router = Router();

const loginController = new LoginController();

router.post('/', validateLogin, loginController.login);
router.get('/validate', validateToken, loginController.validate);

export default router;
