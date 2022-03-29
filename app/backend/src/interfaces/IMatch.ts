export interface ICreateMatch {
  'homeTeam': number,
  'awayTeam': number
  'homeTeamGoals': number,
  'awayTeamGoals': number,
  'inProgress': number,
}

export interface IResMatch {
  'id': number,
  'homeTeam': number,
  'awayTeam': number
  'homeTeamGoals': number,
  'awayTeamGoals': number,
  'inProgress': number,
}

export interface Match {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: number,
  homeClub: {
    clubName: string,
  },
  awayClub: {
    clubName: string,
  }
}

export interface MatchData {
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
