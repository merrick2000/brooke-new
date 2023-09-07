import { IGamePopulated } from "@/types/IGame";
import { IGameSettingsData } from "@/types/IUser";
import { convertToInputDate, formateDate } from ".";

export const convertMatchToGameSettings = (match: IGamePopulated): IGameSettingsData => {
    // Assuming 'match' is an object conforming to the 'Match' interface

    // Extract relevant data from the 'match' object
    const {
        id,
        date,
        nullPoints,
        bonusQuiz,
        bonusChoiceA,
        bonusChoiceB,
        teams,
        winnerId,
        correctBonusChoice
    } = match;

    // Extract team-specific data
    const teamA = teams[0];
    const teamB = teams[1];

    // Create the 'IGameSettingsData' object
    const gameSettingsData: IGameSettingsData = {
        id,
        date,
        nullPoints,
        bonusQuiz,
        bonusChoiceA,
        bonusChoiceB,
        teamAId: teamA?.teamId || '',
        teamAName: teamA?.team?.name,
        teamAFlag: teamA?.team?.flag,
        teamAPoints: teamA?.points || 0,
        teamBId: teamB?.teamId || '',
        teamBName: teamB?.team?.name,
        teamBFlag: teamB?.team?.flag,
        teamBPoints: teamB?.points || 0,
        winnerId,
        correctBonusChoice
    };

    return gameSettingsData;
}
