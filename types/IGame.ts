import { ITeam } from "./IUser";

export interface ITeamPopulated {
    id: string;
    teamId: string;
    matchId: string;
    points: number;
    createdAt: string;
    updatedAt: string;
    team: ITeam;
}

export interface IGamePopulated {
    id: string;
    date: string;
    nullPoints: number;
    bonusQuiz: string;
    bonusChoiceA: string;
    bonusChoiceB: string;
    correctBonusChoice?: number;
    winnerId?: string;
    createdAt: string;
    updatedAt: string;
    teams: ITeamPopulated[];
    _count: {
        bets: number;
    };
}
