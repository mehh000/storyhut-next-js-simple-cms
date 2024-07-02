"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { createPost } from "@/server/action";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Write: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | undefined>("");

  const router = useRouter();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const session = useSession();

  const userId: string | undefined = session.data?.user?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = e.target;

    await createPost(userId, content, title, image?.secure_url);
    router.push("/");
  };

  return (
    <>
      <div className="bg-slate-100 py-5"></div>
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Write a New Blog Post
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your blog title"
            />
          </div>
          <div className="my-3 flex items-center gap-5">
            <Image
              src={image?.secure_url || "/bg.jpg"}
              width={200}
              height={200}
              alt=""
            />
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result, { widget }) => {
                setImage(result.info);
                widget.close();
              }}
            >
              {({ open }) => (
                <button
                  className="p-2 text-center h-fit  bg-green-500 text-white hover:bg-green-700"
                  type="button"
                  onClick={() => open()}
                >
                  Upload an Image
                </button>
              )}
            </CldUploadWidget>
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              className="h-60"
              placeholder="Write your blog content here..."
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 mt-10 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Publish
            </button>
          </div>
        </form>
      </div>

      {/* 
    <div className="bg-white flex items-center justify-center p-5 shadow-lg rounded-md">
    <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div> */}
    </>
  );
};

export default Write;
