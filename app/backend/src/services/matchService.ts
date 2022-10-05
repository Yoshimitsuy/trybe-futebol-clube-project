import { MatchType } from '../types/matchTypes';
import matchModel from '../database/models/matchModel';
import teamModel from '../database/models/teamModel';

class MatchService {
  model = matchModel;

  getAll = async () => {
    const data = await this.model.findAll({
      include: [
        { model: teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return data;
  };

  create = async (match: MatchType) => {
    const data = await this.model.create(match);

    return data;
  };

  update = async (id: string) => {
    const data = await this.model.update({ inProgress: false }, { where: { id } });

    return data;
  };
}

export default MatchService;
