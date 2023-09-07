import React, { Fragment } from "react";
//icons
import { CiMenuFries } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiFillGift, AiOutlineLogout } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { GiTabletopPlayers } from "react-icons/gi";

import { Dialog, Transition } from "@headlessui/react";

import Link from "next/link";
import useDisclosure from "@/hooks/useDisclosure";
import { usePathname, useRouter } from "next/navigation";
import ProtectedView from "../Utils/ProtectedView";
import { USER_ROLE } from "@/helpers/data";
import useAuth from "@/state/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ProtectedView roles={[USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN]}>
      <div className="md:flex">
        <div className="hidden md:block">
          <SideBar />
        </div>
        {/* Mobile Header */}
        <MobileMenu isOpen={isOpen} onClose={onClose} />

        <div className="flex justify-between items-center md:hidden bg-primary p-4">
          <Logo />
          <CiMenuFries onClick={onOpen} className="text-white w-6 h-6" />
        </div>
        <main className="p-3 md:p-10 w-full">{children}</main>
      </div>
    </ProtectedView>
  );
}

const LINKS = [
  {
    title: "Tableau de bord",
    href: "",
    icon: <IoStatsChartSharp className="w-5 h-5" />,
  },
  {
    title: "Utilisateurs",
    href: "users",
    icon: <FiUsers className="w-5 h-5" />,
  },
  {
    title: "Equipes",
    href: "teams",
    icon: <RiTeamFill className="w-5 h-5" />,
  },
  {
    title: "Match",
    href: "games",
    icon: <GiTabletopPlayers className="w-5 h-5" />,
  },
  {
    title: "Récompenses",
    href: "rewards",
    icon: <AiFillGift className="w-5 h-5" />,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const { logoutUser } = useAuth();
  const router = useRouter();

  const onLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <>
      <div className="w-[240px] h-screen bg-primary text-white p-4">
        <Logo />

        <div className="w-full h-[1px] my-4 bg-white" />
        <div className="mt-8 px-2">
          {LINKS.map((l, i) => {
            const url = l?.href ? `/dashboard/${l?.href}` : "/dashboard";
            const isActive = pathname === url;
            return (
              <Link
                key={`link-${i}`}
                href={url}
                className={`flex items-center px-4 py-2 font-serif text-base hover:opacity-80 ${
                  isActive ? "bg-blue-900" : "bg-transparent"
                } rounded-md mb-1`}
              >
                {l.icon}
                <span className="block ml-3">{l.title}</span>
              </Link>
            );
          })}
          <div className="mt-12">
            <div
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-red-500 text-white font-serif text-sm rounded-lg cursor-pointer"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <div className="ml-4">Se déconnecter</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Logo = () => (
  <Link href={"/dashboard"}>
    <h1 className="text-xl text-white text-center font-mono uppercase font-semibold">
      Brooke Prono
    </h1>
  </Link>
);

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="rounded-3xl overflow-hidden">
                <SideBar />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
