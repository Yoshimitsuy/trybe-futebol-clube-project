import { RequestHandler, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private service = new MatchService();

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    return res.status(200).json(data);
  };

  create: RequestHandler = async (req, res) => {
    const matchCreated = await this.service.create(req.body);

    return res.status(201).json(matchCreated);
  };
}

export default MatchController;
