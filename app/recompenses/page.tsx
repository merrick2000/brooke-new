"use client";
import AppLayout from "@/components/Layout/Index";
import useRewards from "@/hooks/useRewards";
import React from "react";

const recompenses = () => {
  return (
    <AppLayout>
      <div className="max-w-[1100px] mx-auto pt-5 pb-20">
        <div className="font-serif">
          <div className="flex items-center text-primary text-[30px] pl-3 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>

            <h1 className="">Récompenses</h1>
          </div>

          <section className="mt-12 px-4">
            <div className="md:pl-12">
              <div className="flex justify-between items-center">
                <h4 className="text-lg md:text-[24px] md:max-w-md">
                  Brooke Pronos vous offre des cadeaux selon votre
                  <span className="text-yellow-500"> classement général</span>!
                </h4>
                <button className="hidden md:inline-block rounded-3xl text-white px-12 py-3 bg-gradient-to-r from-orange-600 to-amber-400">
                  JE COMMENCE MES PRONOS
                </button>
              </div>
              <p className="text-[12px] mt-1">
                Jouer du 8 septembre au 28 octobre 2023
              </p>
            </div>

            <div className="mt-6 md:mt-8">
              <Rewards />
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

const Rewards = () => {
  const {
    rewards: { items },
  } = useRewards();

  const [firstReward, ...restOfRewards] = items;
  return (
    <div>
      <div className="w-full md:w-1/2 px-2 mb-5">
        {firstReward && (
          <div className="max-w-md mx-auto">
            <h5 className={`text-teal-500 text-[16px] md:text-[22px] mb-2`}>
              {firstReward.rank}
            </h5>

            <div className="relative rounded-xl">
              <img
                src={firstReward.image}
                alt=""
                className="w-full h-40 object-cover rounded-2xl"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 p-4 bg-black bg-opacity-20 text-white rounded-2xl flex">
                <p className="self-end max-w-[85%] md:max-w-[75%]">
                  {firstReward.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        {restOfRewards.map((reward) => (
          <div key={reward.id} className="w-full md:w-1/2 px-2 mb-5">
            <div className="max-w-md mx-auto">
              <h5 className={`text-primary text-[16px] md:text-[20px] mb-3`}>
                {reward.rank}
              </h5>
              <div className="relative rounded-xl">
                <img
                  src={reward.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 p-4 bg-black bg-opacity-20 text-white rounded-2xl flex">
                  <p className="self-end max-w-[85%] md:max-w-[75%]">
                    {reward.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default recompenses;
