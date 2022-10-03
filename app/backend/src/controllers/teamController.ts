import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  private service = new TeamService();

  findAll = async (req: Request, res: Response) => {
    const data = await this.service.findAll();
    return res.status(200).json(data);
  };

  findByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this.service.findByPK(id);
    return res.status(200).json(data);
  };
}

export default TeamController;
