import React from 'react';
import RankingComponent from './RankingComponent';

const rankingData = [
  { rank: 1, playerName: "John Doe", points: 350 },
  { rank: 2, playerName: "Jane Smith", points: 280 },
  { rank: 3, playerName: "Alice Johnson", points: 210 },
  { rank: 4, playerName: "Michael Brown", points: 180 },
  { rank: 5, playerName: "Emily Davis", points: 160 },
  { rank: 6, playerName: "William Wilson", points: 140 },
  { rank: 7, playerName: "Olivia Martinez", points: 120 },
  { rank: 8, playerName: "James Anderson", points: 100 },
  { rank: 9, playerName: "Sophia Thomas", points: 80 },
  { rank: 10, playerName: "Daniel White", points: 60 },
];

const RankingList: React.FC = () => {
  return (
    <div className="mb-5">
      {/* En-tête (visible uniquement pour les écrans de taille moyenne et plus grands) */}
      <div className="hidden md:grid grid-cols-5 gap-4 text-gray-600 font-semibold">
        <div className="p-2">Classement</div>
        <div className="p-2">Joueur</div>
        <div className="p-2">Points</div>
        <div className="p-2">Bonus validés</div>
        <div className="p-2">Rallye</div>
      </div>

      <div className="space-y-5">
        {rankingData.map((data, index) => (
          <RankingComponent
            key={index}
            rank={data.rank}
            playerName={data.playerName}
            points={data.points}
            bgColor='#E2E8F0'
          />
        ))}
      </div>
    </div>
  );
};

export default RankingList;
