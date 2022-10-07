import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
// lbController

const router = Router();

const lbController = new LeaderboardController();

router.get('/home', lbController.getHome); // controller.func

export default router;
