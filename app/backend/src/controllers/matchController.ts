import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private service = new MatchService();

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    return res.status(200).json(data);
  };
}

export default MatchController;
