export interface Club {
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

export interface TclubMock {
  id: number,
  clubName: string,
}
