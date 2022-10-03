import teamModel from '../database/models/teamModel';

class TeamService {
  model = teamModel;

  findAll = async () => {
    const data = await this.model.findAll();
    return data;
  };

  findByPK = async (id: string) => {
    const data = await this.model.findByPk(id);
    return data;
  };
}

export default TeamService;
