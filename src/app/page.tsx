"use client";

import Header from "@/Components/Header";
import Navber from "@/Components/Navber";
import React, { useEffect, useState } from "react";
import { categories } from "@/lib/cetegory";
import Footer from "@/Components/Footer";
import Card from "@/Components/Card";
import { Post } from "@prisma/client";
import { getAllPosts } from "@/server/action";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getAllblogs = async () => {
      const data = await getAllPosts();
      console.log(data);
      setPosts(data);
    };
    getAllblogs();
  }, []);
  return (
    <div className="bg-[url('/bg.webp')] bg-origin-content w-full h-svh bg-cover mb-[200px]">
      <Navber />
      <Header />
      <div className="flex items-center flex-wrap gap-5 p-5 justify-center mt-8 bg-slate-100">
        {categories.map((category) => (
          <button
            key={category.name}
            className="px-4 py-2 hover:text-white hover:bg-emerald-700 text-lg rounded-xl bg-transparent border-4 border-emerald-500 flex items-center gap-2 text-emerald-600 font-medium"
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      <div className="flex items-center flex-wrap w-full bg-slate-100 gap-5">
       {
        posts.map((post) => (
           <Card post={post} key={post.id}/>
        ))
       }
      </div>

      <Footer />
    </div>
  );
};

export default Home;
