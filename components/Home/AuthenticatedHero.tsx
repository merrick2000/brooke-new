import React from "react";
import Container from "../Layout/Container";
import { poppins } from "@/helpers/fonts";
import useRewards from "@/hooks/useRewards";
import useAuth from "@/state/auth";
import Link from "next/link";

export default function AuthenticatedHero() {
  const {
    rewards: { items },
  } = useRewards();

  const { user } = useAuth();

  return (
    <div className="bg-gray-100 relative">
      <Container>
        <div className={`${poppins.className}`}>
          <div>
            <div className="flex flex-row md:flex-col justify-between items-center md:items-start p-4">
              <h5
                className={`text-2xl text-primary ${poppins.className} font-semibold`}
              >
                Récompenses
              </h5>
              <p className="text-sm text-primary">Jusqu’au 28 octobre 2023</p>
            </div>

            <div className="flex md:grid md:grid-cols-3 md:gap-8 w-full my-6 md:mx-4 overflow-x-scroll">
              {items.map((reward) => (
                <div
                  key={reward.id}
                  className="relative font-serif bg-primary rounded-2xl min-w-[300px] ml-4 md:ml-0"
                >
                  <img
                    src={reward.image}
                    alt=""
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <div className="absolute top-0 bottom-0 left-0 right-0 px-8 py-4  bg-black bg-opacity-20 text-white rounded-2xl flex flex-col justify-around">
                    <h3 className="text-2xl text-white mb-4">{reward.title}</h3>
                    <p className="max-w-[85%] md:max-w-[75%] text-[15px]">
                      {reward.rank}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 pb-3">
            <div className="flex items-center justify-between">
              <h5 className={`text-lg md:text-xl text-primary font-semibold`}>
                Classement
              </h5>

              <Link
                href={"#"}
                className={`hidden md:block text-lg md:text-xl text-primary font-semibold`}
              >
                Phrase pour lien d’affiliation Parions Sport
              </Link>
            </div>

            {user && (
              <div className="flex items-center mt-2 text-primary text-base md:text-lg">
                <p>{user.username}</p>
                <div className="h-4 w-[1px] bg-primary mx-5 md:mx-8" />
                <p>156pts</p>
                <div className="h-4 w-[1px] bg-primary mx-5 md:mx-8" />
                <p>25/65223</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
