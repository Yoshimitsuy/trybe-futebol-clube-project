import { Router } from 'express';
import MatchController from '../controllers/matchController';
import validateToken from '../middlewares/validateToken';

const router = Router();

const matchController = new MatchController();

router.route('/')
  .get(matchController.getAll)
  .post(validateToken, matchController.create);

router.patch('/:id/finish', matchController.update);
router.patch('/:id', matchController.updateId);

export default router;
