import { getRewards } from "@/api/rewards";
import { IReward } from "@/types/IUser";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
const Hero = () => {
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

  return (
    <>
      <section className="lg:px-[12rem] py-8 relative bg-[url(/assets/mainbg.png)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#67181A] before:to-[#6838B4] before:opacity-[67%] bg-cover bg-center pb-20">
        <div className="px-5 flex flex-col items-center md:items-start space-y-8 w-full lg:w-1/2 lg:my-12">
          <h1 className="text-3xl md:text-4xl font-serif text-center md:text-start relative text-white font-bold">
            Le jeu de <span className="text-hero">Pronos rugby</span> 100%
            gratuit en partenariat avec
            <span className="hidden md:inline"> parions sport</span>
          </h1>
          <img
            src="/assets/parions-sp.png"
            alt="Parions Sport"
            className="relative w-24 md:hidden"
          />
          <p className="relative text-white text-sm">
            Gagne des récompenses & défis tes amis
          </p>
          <div className="relative hidden md:grid md:grid-cols-2 gap-4 ">
            <button className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 py-2 px-8 text-white uppercase text-sm font-bold">
              Je commence mes pronos
            </button>
            <button className="rounded-full text-white border border-white font-bold py-2">
              Connexion
            </button>
          </div>
        </div>
      </section>
      <section className="lg:flex flex-col relative hidden">
        <div className="grid grid-cols-3 gap-8 w-full mx-auto lg:px-[12rem] absolute -top-1/2">
          {rewards.items.map((reward) => (
            <div key={reward.id} className="font-serif bg-primary rounded-xl">
              <div className="relative rounded-xl">
                <img
                  src={reward.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0  px-8 py-4  bg-black bg-opacity-20 text-white rounded-2xl flex flex-col justify-around">
                  <h3 className="text-2xl text-white mb-4">{reward.title}</h3>
                  <p className="max-w-[85%] md:max-w-[75%] text-[15px]">
                    {reward.rank}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-center h-32">
          <ChevronDoubleDownIcon className="h-6 w-6 text-gray-900" />
        </div>
      </section>
    </>
  );
};

export default Hero;
