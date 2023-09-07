import { ReactElement } from "react";
import Link from "next/link";
import "../app/globals.css";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import NavBar from "./Layout/NavBar";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--bricolage-grotesque",
  subsets: ["latin"],
  weight: "500",
});
const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <div className="px-8 py-5 bg-black font-sans font-semibold text-white lg:px-[10rem]">
        <div className="md:flex flex-row justify-between md:mb-[100px]">
            <div className="mb-5">
                <img src="/assets/brooke3.png" alt="brooke logo" style={{
                    width: "7.563rem",
                    height: "3.563rem"
                }}/>
            </div>
            <div className="md:hidden text-xs py-3">
                <ul className="flex flex-row justify-between mb-5">
                    <li className="">
                        <ul>
                            <li className="py-1"><Link href="/comment-jouer">Comment jouer ?</Link> </li>
                            <li className="py-1"><Link href="/recompenses">Récompenses</Link> </li>
                            <li className="py-1"><Link href="/classement">Classement</Link> </li>
                        </ul>
                    </li>
                    <li className="relative -left-6">
                        <ul>
                            <li className="py-1"><Link href="/connexion">Se connecter</Link> </li>
                            <li className="py-1"><Link href="/">S'inscrire</Link> </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ul className="hidden md:inline-block">
                <li className="py-1"><Link href="/comment-jouer">Comment jouer ?</Link> </li>
                <li className="py-1"><Link href="/recompenses">Récompenses</Link> </li>
                <li className="py-1"><Link href="/classement"> Classement</Link></li>
            </ul>
            <ul className="hidden md:inline-block">
                <li className="py-1"><Link href="/connexion">Se connecter</Link> </li>
                <li className="py-1"><Link href="/">S'inscrire</Link> </li>
            </ul>
            {/* <div className="text-xs md:text-[16px] py-3">
                
                
            </div> */}
            <div className="flex flex-row justify-start mb-7">
                <Link href="#" className="pr-3">
                    <img src="/assets/prono-fb.png" alt="brooke prono facebook link" className="h-7"/>
                </Link>
                <Link href="#" className="pr-3">
                    <img src="/assets/prono-insta.png" alt="brooke prono instagram link" className="h-7"/>
                </Link>
                <Link href="#" className="pr-3">
                    <img src="/assets/prono-tiktok.png" alt="brooke tiktok facebook link" className="h-7"/>
                </Link>
                <Link href="#" className="pr-3">
                    <img src="/assets/prono-x.png" alt="brooke prono x link" className="h-7"/>
                </Link>
            </div>
        </div>
        <div className="border-t border-white w-full h-2 my-2"></div>
        <div className="md:flex flex-row justify-between">
            <p className="font-sans font-semibold text-10 md:text-[14px] mb-2">Brooke Pronos a été créé en partenariat avec Parions Sport.</p>
            <p className="font-sans font-semibold text-10 md:text-[14px]">© 2023 - Un jeu développé par Brooke</p>
        </div>
    </div>
  )
}

const Layout = ({ children }: any) => {
  return (
    <div className={`${bricolageGrotesque.variable} ${poppins.variable}`}>
      <NavBar />
      <main className="min-h-[50vh] md:min-h-[55vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
