"use client";

import CenteredCard from "@/components/CenteredCard";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import RulesComponent from "@/components/RulesComponent";
import AppLayout from "@/components/Layout/Index";
import Container from "@/components/Layout/Container";
const CommentJouer = () => {
  return (
    <AppLayout>
      <div className="bg-gray-100 font-serif px-5">
        <div className="hidden lg:flex flex-col justify-center mt-2">
          <p className="font-serif text-primary text-[12px]">En partenariat avec:</p>
          <a href="https://wlfdj.adsrv.eacdn.com/C.ashx?btag=a_976b_108c_&affid=369&siteid=976&adid=108&c=">
          <img src="/assets/parions_sport.png" alt="logo parions sport" style={{
            height: "2.625rem",
            width: "6.625rem"
          }}/>
          </a>
        </div>
        <Container>
        <div className="flex items-center text-primary text-2xl pl-3 font-semibold mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <h1 className="">Comment jouer ?</h1>
        </div>
        <section className="flex flex-col bg-white px-9 pb-10 rounded-2xl my-4">
          <h2 className="text-primary font-extrabold text-lg py-3">
            Brooke Pronos est un jeu totalement{" "}
            <span className="font-bold text-cta">
              gratuit et sans obligation d’achat
            </span>{" "}
            qui vous permet de pronostiquer sur des compétitions sportives.
          </h2>

          {/* Card */}
          <div className="mb-3 lg:grid lg:grid-cols-3 gap-4">
            <CenteredCard
              imageSrc={"../assets/moiwhite.png"}
              heading="Créé un compte en validant tes premiers pronostics"
              link={"/"}
              linkText="Je crée mon compte"
            />
            <CenteredCard
              imageSrc={"../assets/cupwhite.png"}
              heading="Pronostique tous les matchs et les bonus de la compétition"
              link={"/"}
              linkText="Je commence à pronostiquer"
            />
            <CenteredCard
              imageSrc={"../assets/cadowhite.png"}
              heading="Remporte des cadeaux selon ton classement !"
              link={"/recompenses"}
              linkText="Découvrir les récompenses"
            />
          </div>
          {/* End card */}
          <div>
            <h1 className="text-switch-on text-2xl">1. Les Pronostics</h1>
            <p className="text-primary text-left">
              Une fois connectés, vous pouvez choisir l’équipe gagnante ou le
              match nul en cliquant sur le drapeau de l’équipe de votre choix.
              Les points en dessous du drapeaux correspondent au nombre de
              points que vous gagnez si votre pronostic est le bon. Au plus la
              côte est grande au plus vous marquez de points ! À vous de choisir
              si vous
            </p>

            <div className="flex flex-col items-center lg:grid lg:grid-cols-2 gap-4 px-4 py-4 mb-4">
              <img src="/assets/prono2.png" alt="" />
              <img src="/assets/prono1.png" alt="" />
            </div>
            <p className="text-primary text-sm mb-4">
              <b>Exemple :</b>
              <br /> Dans le cas du cas ci-dessus, vous devez cliquer sur le
              drapeau de la France pour remporter 12 points.
            </p>
          </div>
          <div>
            <h1 className="text-switch-on text-2xl">1. Les Bonus</h1>
            <p className="text-primary text-left">
              Les Bonus vous permettent de marquer des points supplémentaires
              afin de vous détacher de vos concurrents ! Sélectionnez la réponse
              que vous pensez la plus réaliste pour marquer le nombre de points
              inscrit sous le logo bonus. Si le résultat de votre bonus est bon,
              vos points Bonus se cumuleront à vos points Pronostics. À noter :
              vous ne pouvez pas perdre de points en jouant un bonus. Seulement
              les bonus réussis sont comptabilisés.
            </p>

            <div className="flex flex-col items-center lg:grid lg:grid-cols-2 gap-4 px-4 py-4 mb-4">
              <img src="/assets/bonus1.png" alt="" />
              <img src="/assets/bonus22.png" alt="" />
            </div>
            <p className="text-primary text-sm mb-4">
              <b>Exemple :</b>
              <br /> Exemple : Dans le cas du cas ci-dessus, vous devez cliquer
              sur le bouton « 25pts ou + » pour sélectionner votre choix. Si
              votre prédiction est bonne, vous remporterez 30 points
              supplémentaires !
            </p>
          </div>
          <div>
            <h1 className="text-switch-on text-2xl">
              3. Validez vos pronostics et bonus !
            </h1>
            <p className="text-primary text-left">
              Pour enregistrer vos Pronostics et Bonus, vous devez absolument
              valider vos sélections en cliquant sur le bouton « Je valide mes
              Pronos ». Si vous êtes connecté à votre compte, votre sélection
              sera comptabilisée automatiquement ; si vous n’êtes pas connecté,
              vous devrez créer un compte pour que votre validation soit
              effective.
            </p>

            <div className="flex flex-col items-center lg:flex-row px-4 py-4 mb-4">
              <div className="flex justify-center items-center mb-2">
                <button
                  className="text-white py-4 px-7 rounded-lg font-serif"
                  style={{
                    background: "#48beb9",
                    width: "17rem",
                    height: "4.313rem",
                  }}
                >
                  Je valide mes pronos
                </button>
              </div>
              <div className="lg:mx-3">
                <AiFillCaretDown className="text-gray-500 h-5 w-5 lg:hidden" />
                <AiFillCaretRight className="text-gray-500 h-5 w-5 hidden lg:inline-block" />
              </div>
              <div className="">
                <button
                  className="flex flex-row justify-center items-center text-white px-4 py-2 rounded-md text-center bg-gradient-to-r from-cyan-300 to-green-500"
                  style={{
                    width: "17rem",
                    height: "4.313rem",
                  }}
                >
                  <BsFillCheckCircleFill className="w-6 h-6 mr-2" />
                  Prono validés
                </button>
              </div>
            </div>
            <p className="text-primary text-sm mb-4">
              Une fois vos pronostics validés, le bouton se changera en « Pronos
              validés » et ils seront alors enregistrés dans votre compte.
            </p>
          </div>
          <div>
            <h1 className="text-switch-on text-2xl mb-2">4. Règlement</h1>
            <RulesComponent />
          </div>
        </section>
        </Container>      
      </div>
    </AppLayout>
  );
};

export default CommentJouer;
