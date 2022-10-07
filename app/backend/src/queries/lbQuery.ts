const homeQ = `
SELECT 
  te.team_name AS name,
COUNT(te.team_name) AS totalGames,
CAST(((SUM(ma.home_team_goals > ma.away_team_goals) * 3) + 
  SUM(ma.home_team_goals = ma.away_team_goals)) AS REAL) AS totalPoints,
CAST(SUM(ma.home_team_goals > ma.away_team_goals) AS REAL) AS totalVictories,
CAST(SUM(ma.home_team_goals = ma.away_team_goals) AS REAL) AS totalDraws,
CAST(SUM(ma.home_team_goals < ma.away_team_goals) AS REAL) AS totalLosses,
CAST(SUM(ma.home_team_goals) AS REAL) AS goalsFavor,
CAST(SUM(ma.away_team_goals) AS REAL) AS goalsOwn,
CAST(SUM(ma.home_team_goals - ma.away_team_goals) AS REAL) AS goalsBalance,
CAST(((((SUM(ma.home_team_goals > ma.away_team_goals) * 3) + 
SUM(ma.home_team_goals = ma.away_team_goals)) 
  / (COUNT(te.team_name) * 3) *100)) AS DECIMAL(10,2)) AS efficiency
FROM
  TRYBE_FUTEBOL_CLUBE.matches AS ma
INNER JOIN
  TRYBE_FUTEBOL_CLUBE.teams AS te 
ON te.id = ma.home_team
WHERE
  ma.in_progress = 0
GROUP BY
  te.team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn DESC
  `;

export default homeQ;
