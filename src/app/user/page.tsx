"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

import { useSession } from "next-auth/react";
import { getUserById } from "@/server/action";
import { redirect, useRouter } from "next/navigation";
import Navber from "@/Components/Navber";

const User: React.FC = () => {
  const [name, setName] = useState<string | null | undefined>("John Doe");
  const [image, setImage] = useState<string | null | undefined>();
  const [email, setEmail] = useState<string | null | undefined>(
    "john.doe@example.com"
  );
  const [bio, setBio] = useState<string | null | undefined>(
    "Software Developer | Tech Enthusiast"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<string | null | undefined>();



  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Account deleted");
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };
  const session = useSession();




  const id = session?.data?.user?.id;
  console.log(session.data);
  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUserById(id);
      setUser(userData?.role);
     
      setName(userData?.name);
      setEmail(userData?.email);
      setBio(userData?.bio);
      setImage(userData?.image);
    };
    getUserData();
  
  }, []);

  if (!session?.data?.user) {
    redirect("/");
  }

  return (
    <>
      <Navber />
      <div className=" pt-[150px]">
        <div className="max-w-2xl mx-auto  p-6 bg-white rounded-xl   shadow-md">
          <div className="">
            <div className="flex justify-center items-center flex-col  mb-6">
              <Image
                src={image || "/user.png"}
                alt="User Image"
                height={200}
                width={200}
                className="rounded-full object-contain border-4 border-emerald-300"
              />

              <h1 className="text-2xl font-bold text-center">{name}</h1>
              {user === "USER" ? (
                <span className="text-xl font-semibold text-emerald-500">
                  User
                </span>
              ) : (
                <span className="text-xl font-semibold text-red-500">
                  Writer
                </span>
              )}
            </div>
            <form className="space-y-4 mb-6">
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </form>
            <button
              onClick={handleDelete}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Account
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
                  <p className="mb-4">
                    Do you really want to delete this account?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={cancelDelete}
                      className="px-6 py-2 bg-gray-300 rounded-lg font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      No
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default User;
