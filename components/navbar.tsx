"use client";
import { ReactElement } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const links: {
  icon?: ReactElement;
  label: string;
  active: boolean;
  link: string;
}[] = [
  // {
  //   label: "Jouer",
  //   active: false,
  // },
  {
    label: "Comment Jouer?",
    active: false,
    link: "/comment-jouer",
  },
  {
    label: "Récompenses",
    active: false,
    link: "/recompenses",
  },
  {
    label: "Classement",
    active: false,
    link: "/classement",
  },
  // {
  //   label: "Mon compte",
  //   active: false,
  // },
];

const Navbar = () => {
  return (
    <Disclosure as="header" className="bg-transparent">
      {({ open }) => (
        <>
          <div>
            <nav className="flex items-center justify-between bg-primary py-5 pl-14 pr-3.5">
              <div className="flex space-x-8">
                <Link href="/">
                  <img
                    src="/assets/logo-pronodrop.png"
                    alt="prono drop logo"
                    style={{
                      width: "5.063rem",
                      height: "2.375rem",
                    }}
                  />
                </Link>
                <p className="text-white text-sm hidden lg:block">
                  Pronostiquez gratuitement sur les plus grandes compétitions{" "}
                  <br /> et gagnez des récompenses
                </p>
              </div>
              <div>
                <ul className="flex space-x-4 items-center">
                  <li className="mr-8 hidden md:inline-block">
                    <ul className="flex items-center justify-between space-x-12">
                      {links.map((item, index) => (
                        <li key={`desktop-item-${index}`}>
                          <Link
                            className="text-white text-sm font-bold uppercase truncate"
                            href={item.link}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <Link
                      className="font-serif text-secondary px-6 py-2 border border-secondary rounded-full"
                      href="/profile"
                    >
                      Connexion
                    </Link>
                  </li>
                  <li className="flex items-center justify-center md:hidden">
                    <Disclosure.Button className="my-auto">
                      <Bars3BottomRightIcon className="h-9 w-9 text-white" />
                    </Disclosure.Button>
                  </li>
                </ul>
              </div>
            </nav>

            <Disclosure.Panel className="bg-gradient-to-br from-[#e39c3d] to-[#eacf72] rounded-br-[55px] px-14 relative">
              <h1 className="text-white font-bold pt-4">Menu</h1>
              <ul className="text-white pt-6 grid divide-y pb-8">
                {links.map((item, index) => (
                  <li className="py-2" key={`mobile-item-${index}`}>
                    <Link
                      className="font-medium truncate font-serif"
                      href={item.link}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <img
                src="/assets/Groupe 129.png"
                alt=""
                className="absolute bottom-0 right-0 w-64"
              />
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
