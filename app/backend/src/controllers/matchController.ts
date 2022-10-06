import { RequestHandler, Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private service = new MatchService();

  getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    return res.status(200).json(data);
  };

  create: RequestHandler = async (req, res) => {
    try {
      const matchCreated = await this.service.create(req.body);
      return res.status(201).json(matchCreated);
    } catch ({ message }) {
      if (message === 'There is no team with such id!') {
        return res.status(404).json({ message });
      }
      return res.status(401).json({ message });
    }
  };

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this.service.update(id);

    return res.status(200).json({ message: 'Finished' });
  };

  updateId: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this.service.updateId(id, req.body);
    return res.status(200).json({ message: 'GOLAÇOOOOO' });
  };
}

export default MatchController;
