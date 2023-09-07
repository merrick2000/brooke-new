import useAuth from '../state/auth';
import axios from 'axios';
import CountryCard from './CountryCard';
import BonusBox from './BonusBox';
import CtaPointChoice from './CtaPointChoice';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { RadioGroup } from '@headlessui/react';
import PronoCard from './PronoCard';

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


const MatchList = () => {

  
    const [betData, setBetData] = useState([])
//   const { isAuthenticated, user, fetchUserData } = useAuth();
  const apiUrl = 'https://brooke-prono-api-506ff5421a56.herokuapp.com/api/games';

  const [apiData, setApiData] = useState<ApiDataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const betPayloads:any = [];
        // Check if the user is authenticated
          const response = await axios.get(apiUrl);

          // Check if the API request was successful
          if (response.data.success) {
            const apiItems: ApiDataItem[] = [...response.data.data.items].reverse();
            setApiData(apiItems);
            apiItems.map((item, key)=>{
                betPayloads.push({
                    matchId: item.id,
                    teamId: item.teams[key].teamId,
                    bonusChoice: null
                });
            })
            setBetData(betPayloads)
            console.log(betData)
            console.log('API Data:', apiItems);
          } else {
            console.error('API Request Failed:', response.data);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        // Set isLoading to false after the request completes, regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading]);

 
  return (
    <div>
        {isLoading ? (
          // Render the spinner while authentication or data is loading
          <Spinner /> // Replace with your spinner component
        ) : (
          // Render the data when authentication and data are available
          apiData && apiData.map((item,key) => (
            <PronoCard item={item} key={key} />
          )))}

    </div>
  )
}

export default MatchList
