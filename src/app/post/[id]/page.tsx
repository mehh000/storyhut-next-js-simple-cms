"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import { FaUserCircle } from "react-icons/fa";
import { createComment, getPostById } from "@/server/action";
import { Comment, Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import Navber from "@/Components/Navber";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Post: React.FC = ({ params }: { params: string }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[] | undefined>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>();

  const handleCommentChange = (value: string) => {
    setComment(value);
  };
  const { id } = params;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(comment);
    await createComment(id, comment);
    window.location.reload;
    setLoad(!load);
  };

  useEffect(() => {
    const getPost = async () => {
      const mypost = await getPostById(id);

      setPost(mypost);
      setComments(mypost?.comments);
      window.location.reload;
    };
    getPost();
  }, [comment, comments, post, load]);

  const session = useSession();
 // console.log(session.status);

  return (<>
  <Navber />
  <div className="py-10"></div>
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6"> {post?.title} </h1>
      <div className="w-full flex items-center ">
        <Image
          src={post?.image || "/bg.jpg"}
          alt="Blog Post Image"
          width={600}
          height={400}
          className="rounded-xl border-2"
        />
      </div>

      <div className="flex items-center my-6">
        <div className="relative w-12 h-12 mr-4">
          <Image
            src={post?.user.image || "/user.png"}
            alt="Author Image"
            layout="fill"
            className="rounded-full"
            objectFit="cover"
          />
        </div>
        <div>
        <Link href={`/profile/${post?.user.id}`}>  <p className="text-lg font-medium"> {post?.user.name} </p></Link>
          <p className="text-gray-500">January 1, 2024</p>
        </div>
      </div>
      <div className="prose mb-6">
        <p dangerouslySetInnerHTML={{ __html: post?.content }}></p>
      </div>

      <form onSubmit={handleCommentSubmit} className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
        <ReactQuill
          value={comment}
          onChange={handleCommentChange}
          className="h-40 mb-4"
          placeholder="Write your comment here..."
        />

        {session.status === "authenticated" ? (
          <button
            type="submit"
            className="px-6 py-3 mt-7 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="px-6 py-3 mt-7 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Log in to comment
          </button>
        )}
      </form>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments?.map((comment) => (
          <div className="flex items-start mb-4" key={comment.id}>
            <FaUserCircle size={40} className="mr-4 text-gray-500" />
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
            </div>
          </div>
        ))}
      </div>
    </div> </>
  );
};

export default Post;
