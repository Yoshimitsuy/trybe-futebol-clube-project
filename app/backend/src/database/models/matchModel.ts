import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import teamModel from './teamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(teamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(teamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
