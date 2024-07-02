 "use client"

import Card2 from "@/Components/Card2";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { Post, User } from "@prisma/client";
import { getUserById } from "@/server/action";

const Profile: React.FC = ({ params }: { params: string }) => {
  const [myData, setMyData] = useState<User | undefined | null>();
  const [myCard, setMyCard] = useState<Post[] | undefined >([]);
  const { id } = params;

  useEffect(() => {
    const getMyProileIfo = async () => {
      const myInfo = await getUserById(id);
      console.log(myInfo);
      setMyData(myInfo);
      setMyCard(myInfo.posts);
    };
    getMyProileIfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-8">
        <div className="relative w-24 h-24 mr-6">
          <Image
            src={myData?.image || "/user.png"}
            height={350}
            width={350}
            alt="user"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold"> {myData?.name} </h1>
          <p className="text-gray-600">{ myData?.bio || "Software Developer | Tech Enthusiast"}</p>
        </div>
      </div>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {
        myCard?.map((post) => <Card2 key={post.id} post={post} />)

      }
      </div>
    </div>
  );
};

export default Profile;
