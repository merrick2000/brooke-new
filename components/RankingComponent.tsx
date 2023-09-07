import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { GiTrophyCup } from 'react-icons/gi';

interface RankingProps {
  rank: number;
  playerName: string;
  points: number;
  bgColor?: string;
}

const RankingComponent: React.FC<RankingProps> = ({
  rank,
  playerName,
  points,
  bgColor = '#E2E8F0'
}) => {
  return (
    <>
      <div
        className={`flex items-center justify-between p-4 rounded-md`}
        style={{
          backgroundColor: "#E2E8F0"
        }}
      >
        <span className="text-gray-600 text-lg font-bold">{rank}</span>
        <span>
          <AiFillStar className="bg-transparent text-yellow-500 w-7 h-7 inline"/>
          <span className="text-gray-800 text-lg inline ml-2">{playerName}</span>
        </span>
        <span className="text-primary text-lg font-bold font-sans">{points} points</span>
        <span className="text-primary text-lg font-bold font-sans hidden md:inline-block">5</span>
        <div className="md:grid grid-cols-5 gap-2">
            <span className="w-2 h-2 rounded-full  bg-cta"></span>
            <span className="w-2 h-2 rounded-full  bg-cta"></span>
            <span className="w-2 h-2 rounded-full  bg-[#D33E43]"></span>
            <span className="w-2 h-2 rounded-full  bg-[#D33E43]"></span>
            <span className="w-2 h-2 rounded-full  bg-cta"></span>
         </div>

      </div>
    </>
    
  );
};

export default RankingComponent;
