"use client";
import React, {  useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { BiUser } from "react-icons/bi";
import { logout } from "@/server/action";



const Navber = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const session = useSession();
  console.log(session.status);

  const handleLogout = async () => {
   await logout();
    window.location.reload();
  };

  return (
    <nav className=" fixed w-full top-0 left-0  bg-bgcolor  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <Link href={"/"}>
              {" "}
              <h1 className="sm:text-5xl text-2xl text-orange-600  font-bold">
                StoryHut
              </h1>{" "}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="#nature"
                className="text-white drop-shadow-lg border-2    hover:bg-emerald-600 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Nature
              </Link>
              <Link
                href="#health"
                className="text-white drop-shadow-lg border-2   hover:bg-emerald-600 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Health
              </Link>
              <Link
                href="#technology"
                className="text-white drop-shadow-lg border-2   hover:bg-emerald-600 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Technology
              </Link>
              <Link
                href="#travel"
                className="text-white drop-shadow-lg border-2   hover:bg-emerald-600 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Travel
              </Link>
              <Link
                href="#lifestyle"
                className="text-white drop-shadow-lg border-2   hover:bg-emerald-600 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Lifestyle
              </Link>
            </div>
          </div>
          <div className=" relative left-0 right-0 group">
            <BiUser
              size={50}
              className="p-2 rounded-full font-medium text-white border-2 border-white hover:text-white hover:bg-emerald-500"
            />
            <div className="bg-white p-2 absolute z-50 rounded-lg shadow-md hidden group-hover:block ">
              {session.status === "authenticated" && (
                <div className="flex flex-col gap-3">
                  <Link href={"/user"}>
                    {" "}
                    <h1 className="text-black font-bold p-2 border-2 border-emerald-500 hover:text-white hover:bg-emerald-700 rounded-md">
                      Profile{" "}
                    </h1>{" "}
                  </Link>
                  <Link href={"/wittng"} >
                    {" "}
                    <h1 className="text-black font-bold p-2 border-2 border-emerald-500 hover:text-white hover:bg-emerald-700 rounded-md">
                      Write{" "}
                    </h1>{" "}
                  </Link>
                </div>
              )}

              {session.status === "authenticated" ? (
                <h1
                  onClick={() => handleLogout()}
                  className="text-black cursor-pointer font-bold p-2 border-2 border-emerald-500 hover:text-white hover:bg-red-700 rounded-md mt-2"
                >
                  LogOut{" "}
                </h1>
              ) : (
                <Link href={"/api/auth/signin"}>
                  {" "}
                  <h1
                    onClick={() => logout()}
                    className="text-black cursor-pointer font-bold p-2 border-2 border-emerald-500 hover:text-white hover:bg-red-700 rounded-md mt-2"
                  >
                    LogIn{" "}
                  </h1>
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <FaBars
                size={40}
                className=" text-blue-600 p-1 border-2 border-white rounded-lg"
              />
            </button>
          </div>
        </div>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white h-screen w-3/4 fixed top-0 left-0 z-50 transform transition-transform duration-300">
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          <a
            href="#nature"
            className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Nature
          </a>
          <a
            href="#health"
            className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Health
          </a>
          <a
            href="#technology"
            className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Technology
          </a>
          <a
            href="#travel"
            className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Travel
          </a>
          <a
            href="#lifestyle"
            className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Lifestyle
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
