import { getRewards } from "@/api/rewards";
import { IReward } from "@/types/IUser";
import React, { useState, useEffect } from "react";

export default function useRewards() {
  const [rewards, setRewards] = useState<{ items: IReward[] }>({
    items: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setIsLoading(true);
        const { data } = await getRewards();
        if (data.success) {
          setRewards(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRewards();
  }, []);
  return {
    isLoading,
    rewards,
  };
}
