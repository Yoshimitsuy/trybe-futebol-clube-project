export type MatchType = {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export type MatchUpdateType = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
