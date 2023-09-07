import Image from "next/image";
import React, { useEffect, useState } from "react";
import LeftLabelToggle from "./LeftLabelToggle";
import PronoBtn from "./PronoBtn";
import MatchList from "./MatchList";


const ContentSection = () => {

  const handleImageClick = () => {
    // Redirect to the desired link when the image is clicked
    window.location.href = 'https://wlfdj.adsrv.eacdn.com/C.ashx?btag=a_976b_108c_&affid=369&siteid=976&adid=108&c=';
  };

  return (
    <div className="lg:flex flex-row justify-start lg:bg-[#FAF9F7] lg:mt-3 lg:relative">
      <div style={{
        width: "450px"
      }}>
        <img onClick={handleImageClick} src="/assets/affiliate-lg.jpeg" alt="brooke prono lien affiliation parions sport" className="hidden lg:inline-block cursor-pointer h-auto w-full"/>
      </div>
      <div className="bg-gray-100 w-full">
        <div className="flex flex-row justify-between h-8 py-6 p-4 md:px-10">
          {/* Logo and switch */}
          <div className="flex flex-row items-center justify-center pb-3 pt-3">
            <Image
              src="/assets/logor23.png"
              alt="Logo Rugby Paris 2023"
              width={30}
              height={50}
              className="mr-3"
            />
            <p>
              <span className="lg:text-md text-sm text-[#0A2AA9] font-serif font-medium">RUGBY</span><br />
              <span className="lg:text-md text-sm text-primary font-serif font-bold">PARIS 2023</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="hidden lg:inline-block">
              <LeftLabelToggle label="Match à venir" />
            </div>
            <div>
              <LeftLabelToggle label="Match Passés" />
            </div>
          </div>
        </div>
        {/* Content section*/}
        <section className="p-4 md:px-10">
          <MatchList />
          <div className="space-y-4"></div>

          <div className="lg:absolute lg:right-[8rem] lg:top-[20rem]">
            <PronoBtn size={18} />
          </div>
        </section>
        <section
          className="lg:hidden"
          style={{
            width: "100vw",
          }}
        >
          <a href="https://wlfdj.adsrv.eacdn.com/C.ashx?btag=a_976b_108c_&affid=369&siteid=976&adid=108&c=">
          <img
            src="/assets/affiliate-mob.jpeg"
            alt=""
            style={{
              width: "100%"
            }}
          />
          </a>
        </section>
      </div>
      <div style={{
        width: "450px"
      }}>
      <img onClick={()=> handleImageClick()}  src="/assets/affiliate-lg.jpeg" alt="brooke prono lien affiliation parions sport" className="hidden lg:inline-block cursor-pointer h-auto w-full"/>
      </div>
    </div>
  );
};

export default ContentSection;
