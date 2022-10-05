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
    if (match.homeTeam === match.awayTeam) {
      throw new Error('It is not possible to create a match with two equal teams');
    }

    const home = await this.model.findByPk(match.homeTeam);
    const away = await this.model.findByPk(match.awayTeam);

    if (!home || !away) {
      throw new Error('There is no team with such id!');
    }
    const data = await this.model.create(match);

    return data;
  };

  update = async (id: string) => {
    const data = await this.model.update({ inProgress: false }, { where: { id } });

    return data;
  };
}

export default MatchService;
