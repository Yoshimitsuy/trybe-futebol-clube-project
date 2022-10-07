// MODELS
import { QueryTypes } from 'sequelize';
import teamModel from '../database/models/teamModel';
import matchModel from '../database/models/matchModel';
import homeQ from '../queries/lbQuery';

class LeaderboardService {
  mModel = matchModel;
  tmodel = teamModel;

  getHome = async () => {
    const home = await this.mModel.sequelize?.query(homeQ, { type: QueryTypes.SELECT });
    return home;
  };
}

export default LeaderboardService;

// const users = await sequelize.query("SELECT * FROM `users`",
// { type: QueryTypes.SELECT });
