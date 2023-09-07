"use client";

import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import BonusBox from "./BonusBox";
import CtaPointChoice from "./CtaPointChoice";

interface Team {
    id: string;
    teamId: string;
    matchId: string;
    points: number;
    createdAt: string;
    updatedAt: string;
    team: {
      id: string;
      flag: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  }
  
  interface ApiDataItem {
    id: string;
    date: string;
    nullPoints: number;
    bonusQuiz: string;
    bonusChoiceA: string;
    bonusChoiceB: string;
    createdAt: string;
    updatedAt: string;
    winnerId: string | null;
    correctBonusChoice: string | null;
    teams: Team[];
    _count: {
      bets: number;
    };
  }
const PronoCard = ({item, value ,onChange}: {item: ApiDataItem, value:{matchId: string, teamId: string, bonusChoice:string},onChange:(param: {matchId: string, teamId: string, bonusChoice:string})=> void}) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    useEffect(()=> {
        console.log(selectedCountry)
      }, [selectedCountry])
    
  return (
    <>
        <div key={item.id} className="rounded-xl px-4 py-4 bg-white mb-4 lg:px-[5rem]">
              <h3 className="font-serif font-bold text-primary text-base text-center">
                {new Date(item.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <h5 className="font-serif text-primary text-xs text-center my-3">
                {new Date(item.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {' - TF1'}
                </h5>
                <div id={item.id}>
                    <RadioGroup value={value.matchId} onChange={(param)=>onChange({...value, matchId: param})} className="teamList flex flex-row justify-between lg:px-[6rem]">
                        <RadioGroup.Option value={`${item.teams[0].teamId}`}>
                            {({ checked }) => (
                                <CountryCard
                                country={item.teams[0].team.name}
                                flag={item.teams[0].team.flag}
                                points={item.teams[0].points}
                                teamId={`${item.teams[0].teamId}`}
                                checked={checked}
                                />
                            )}
                        </RadioGroup.Option>
                        
                        <RadioGroup.Option value='null'>
                        {({ checked }) => (
                                <CountryCard
                                country="Match Nul"
                                flag="/assets/matchnul.png"
                                points={item.nullPoints}
                                teamId={`null`}
                                checked={checked}
                            />
                            )}
                            
                        </RadioGroup.Option>
                        <RadioGroup.Option value={`${item.teams[1].teamId}`}>
                            {({ checked }) => (
                                <CountryCard
                                country={item.teams[1].team.name}
                                flag={item.teams[1].team.flag}
                                points={item.teams[1].points}
                                teamId={`${item.teams[1].teamId}`}
                                checked={checked}
                                />
                            )}
                        </RadioGroup.Option>
                    </RadioGroup>
                  
                </div>
                <div className="border-t border-dashed border-gray-300 w-full h-2 my-3"></div>
                <BonusBox
                  points="+30"
                  text={item.bonusQuiz}
                />
                <CtaPointChoice
                  leftBtnPoint={item.bonusChoiceA}
                  rightBtnPoint={item.bonusChoiceB}
                />
              </div>
    </>
  )
}

export default PronoCard
