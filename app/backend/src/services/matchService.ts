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
}

export default MatchService;
