import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({post}) => {

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <div className="max-w-[350px] mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col  gap-[5px] md:max-w-2xl">
      
        <Image
          src={post.image ||"/bg.jpg"}
          alt="Background Image"
          height={350}
          width={400}
          objectFit=""
        />
    
      <div className="p-6">
        <div className="flex items-center space-x-4">
         
            <Image
              src={post.user.image || "/user.png"}
              alt="User Image"
            height={50}
            width={50}
              className="rounded-full"
             
            />
         
          <div>
            <h2 className="text-xl font-bold"> {post.user.name} </h2>
            <p className="text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-gray-900">{post.title}</h3>
        <p className="mt-2 w-[320px] text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }} ></p>
        <div className="mt-4 flex justify-between items-center">
          <Link href={`/post/${post.id}`} className="text-indigo-600 hover:text-indigo-900 font-semibold">Read more</Link>

        </div>
      </div>
    </div>
  );
};

export default Card;
