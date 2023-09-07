export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  username: string;
  avatar?: string | null;
  birthDate?: string | null;
  userRole: UserRole;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IRewardData {
  id?: string;
  rank: string;
  title: string;
  image: string;
}
export interface IReward extends IRewardData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamData {
  id?: string;
  name: string;
  flag: string;
}

export interface ITeam extends ITeamData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGameSettingsData {
  id?: string;
  date: string;
  nullPoints: number;
  bonusQuiz: string;
  bonusChoiceA: string;
  bonusChoiceB: string;
  teamAId: string;
  teamAPoints: number;
  teamAName?: string;
  teamAFlag?: string;
  teamBId: string;
  teamBPoints: number;
  teamBName?: string;
  teamBFlag?: string;
  correctBonusChoice?: number;
  winnerId?: string;
  createdAt?: string;
  updatedAt?: string

}
