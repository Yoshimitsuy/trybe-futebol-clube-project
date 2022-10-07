export default interface IPremierLeagueTable {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

// - `Classificação`: Posição na classificação;
// - `Time`: Nome do time;
// - `P`: Total de Pontos;
// - `J`: Total de Jogos;
// - `V`: Total de Vitórias;
// - `E`: Total de Empates;
// - `D`: Total de Derrotas;
// - `GP`: Gols marcados a favor;
// - `GC`: Gols sofridos;
// - `SG`: Saldo total de gols;
// - `%`: Aproveitamento do time.

// <br/>
