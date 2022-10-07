import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';

class leaderboardController {
  private service = new LeaderboardService();

  getHome: RequestHandler = async (req, res) => {
    const homeBoard = await this.service.getHome();
    return res.status(200).json(homeBoard);
  };
}

export default leaderboardController;
