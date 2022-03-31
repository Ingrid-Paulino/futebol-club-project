import { IResMatch, MatchData } from '../../interfaces/IMatch';

export const match: IResMatch = {
	id: 66,
	homeTeam: 10,
	awayTeam: 9,
	homeTeamGoals: 2,
	awayTeamGoals: 2,
	inProgress: 1
}

// export const matchs: IResMatch[] = [
//   {
// 	id: 66,
// 	homeTeam: 10,
// 	awayTeam: 9,
// 	homeTeamGoals: 2,
// 	awayTeamGoals: 2,
// 	inProgress: 1
// },
// ]

export const matchs: IResMatch[] = [
  {
		id: 9,
		homeTeam: 1,
		homeTeamGoals: 0,
		awayTeam: 3,
		awayTeamGoals: 3,
		inProgress: 0,
	},
	{
		id: 10,
		homeTeam: 2,
		homeTeamGoals: 0,
		awayTeam: 1,
		awayTeamGoals: 2,
		inProgress: 0,
	},
	{
		id: 30,
		homeTeam: 3,
		homeTeamGoals: 0,
		awayTeam: 2,
		awayTeamGoals: 4,
		inProgress: 0,
	},
]

export const clubDados: MatchData[] = [
	{
		name: 'Bahia',
		totalPoints: 3,
		totalGames: 2,
		totalVictories: 1,
		totalDraws: 0,
		totalLosses: 1,
		goalsFavor: 4,
		goalsOwn: 2,
		goalsBalance: 2,
		efficiency: 50
	},
	{
		name: 'Botafogo',
		totalPoints: 3,
		totalGames: 2,
		totalVictories: 1,
		totalDraws: 0,
		totalLosses: 1,
		goalsFavor: 3,
		goalsOwn: 4,
		goalsBalance: -1,
		efficiency: 50
	},
	{
		name: 'Avaí/Kindermann',
		totalPoints: 3,
		totalGames: 2,
		totalVictories: 1,
		totalDraws: 0,
		totalLosses: 1,
		goalsFavor: 2,
		goalsOwn: 3,
		goalsBalance: -1,
		efficiency: 50
	},
]

// export const clubDadosHome: MatchData[] = [
// 	{
// 		name: 'Botafogo',
// 		totalPoints: 4,
// 		totalGames: 5,
// 		totalVictories: 1,
// 		totalDraws: 1,
// 		totalLosses: 3,
// 		goalsFavor: 3,
// 		goalsOwn: 8,
// 		goalsBalance: -5,
// 		efficiency: 26.67
// 	},
// 	{
// 		name: 'Avaí/Kindermann',
// 		totalPoints: 4,
// 		totalGames: 5,
// 		totalVictories: 1,
// 		totalDraws: 1,
// 		totalLosses: 3,
// 		goalsFavor: 4,
// 		goalsOwn: 8,
// 		goalsBalance: -4,
// 		efficiency: 26.67
// 	},
// 	{
// 		name: 'Bahia',
// 		totalPoints: 2,
// 		totalGames: 5,
// 		totalVictories: 0,
// 		totalDraws: 2,
// 		totalLosses: 3,
// 		goalsFavor: 2,
// 		goalsOwn: 6,
// 		goalsBalance: -4,
// 		efficiency: 13.33
// 	},
	
// ] 

// export const clubDados: MatchData[] = [
// 	{
// 		name: Avaí/Kindermann,
// 		totalPoints: 4,
// 		totalGames: 5,
// 		totalVictories: 1,
// 		totalDraws: 1,
// 		totalLosses: 3,
// 		goalsFavor: 4,
// 		goalsOwn: 8,
// 		goalsBalance: -4,
// 		efficiency: 26.67
// 	},
// 	{
// 		name: Bahia,
// 		totalPoints: 2,
// 		totalGames: 5,
// 		totalVictories: 0,
// 		totalDraws: 2,
// 		totalLosses: 3,
// 		goalsFavor: 2,
// 		goalsOwn: 6,
// 		goalsBalance: -4,
// 		efficiency: 13.33
// 	},
// 	{
// 		name: Botafogo,
// 		totalPoints: 4,
// 		totalGames: 5,
// 		totalVictories: 1,
// 		totalDraws: 1,
// 		totalLosses: 3,
// 		goalsFavor: 3,
// 		goalsOwn: 8,
// 		goalsBalance: -5,
// 		efficiency: 26.67
// 	},
// ] 
