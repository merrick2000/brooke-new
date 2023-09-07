"use client";
import CenteredCard from "@/components/CenteredCard";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import { BsPlusCircle, BsPlusLg } from "react-icons/bs";
import RulesComponent from "@/components/RulesComponent";
import SearchBar from "@/components/SearchBar";
import RankingList from "@/components/RankingList";
import PronoBtn from "@/components/PronoBtn";
import AppLayout from "@/components/Layout/Index";
const Classement = () => {
  return (
    <AppLayout>
      <div className="bg-gray-100 pb-10 font-serif mb-10">
        <div className="hidden lg:flex flex-col justify-center mt-2 px-8">
          <p className="font-serif text-primary text-[12px]">En partenariat avec:</p>
          <a href="https://wlfdj.adsrv.eacdn.com/C.ashx?btag=a_976b_108c_&affid=369&siteid=976&adid=108&c=">
          <img src="/assets/parions_sport.png" alt="logo parions sport" style={{
            height: "2.625rem",
            width: "6.625rem"
          }}/>
          </a>
        </div>
        <div className="lg:mx-[10rem]">
          <div className="flex items-center text-primary text-2xl pl-6 font-semibold mt-2 lg:hidden">
            <GiTrophyCup className="w-6 h-6 mr-4" />
            <h1 className="">Classement</h1>
          </div>
          <div className="hidden lg:grid grid-cols-3">
              <div className="flex items-center text-primary text-2xl font-semibold mt-2">
                <GiTrophyCup className="w-6 h-6 mr-4" />
                <h1 className="">Classement</h1>
              </div>
              <div className="flex flex-row font-extrabold text-lg lg:text-sm mt-3">
                <button
                  className="text-white px-4 py-2 mr-3 rounded-full text-center bg-primary"
                  style={
                    {
                      // width: "17rem",
                      // height: "4.313rem"
                    }
                  }
                >
                  Tous
                </button>
                <button className="flex flex-row justify-center items-center border-2 border-primary text-primary px-4 py-2 rounded-full text-center bg-transparent">
                  <AiFillStar className="bg-transparent text-yellow-500 w-7 h-7" />{" "}
                  Mes Favoris
                </button>
              </div>
              <div className="pt-3">
              <SearchBar />
              </div>
                
          </div>
          <section className="flex flex-col bg-white lg:bg-slate-100 px-9 py-3 rounded-2xl mt-4">
            <div className="lg:hidden">
              <div className="flex justify-start font-extrabold text-lg w-full mt-3">
                <button
                  className="text-white px-4 py-2 mr-3 rounded-full text-center bg-primary"
                  style={
                    {
                      // width: "17rem",
                      // height: "4.313rem"
                    }
                  }
                >
                  Tous
                </button>
                <button className="flex flex-row justify-center items-center border-2 border-primary text-primary px-4 py-2 rounded-full text-center bg-transparent">
                  <AiFillStar className="bg-transparent text-yellow-500 w-7 h-7" />{" "}
                  Mes Favoris
                </button>
              </div>
              <div className="my-5">
              <SearchBar />
              </div>
            </div>
            <RankingList />
            <div className="flex flex-row justify-center mb-4 items-center">
              <BsPlusCircle className="w-10 h-10 lg:hidden" />
            </div>
          </section>
          <section
            className="md:hidden"
            style={{
              width: "100vw",
            }}
          >
            <a href="https://wlfdj.adsrv.eacdn.com/C.ashx?btag=a_976b_108c_&affid=369&siteid=976&adid=108&c=">
            <img
              src="/assets/affiliate-mob.jpeg"
              alt=""
              style={{
                width: "100vw",
                height: "5.313rem",
              }}
            />
            </a>
          </section> 
        </div>       
      </div>
    </AppLayout>
  );
};

export default Classement;
