"use server";

import { db } from "../../db";
import { signOut } from "../../auth";
import { revalidatePath } from "next/cache";
import { Post } from "@prisma/client";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
      include: {
        posts: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

/*   signOut */

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

/* post in the blog */

export const createPost = async (
  userId: string,
  content: string,
  title: String,
  image: string
) => {
  try {
    await db.post.create({
      data: {
        userId: userId,
        content: content,
        title: title,
        image: image,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/* get all posts */
export const getAllPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        user: true,
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
  }
};

/* get post by user id */

export const getPostByUserId = async (userId: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        userId: userId,
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
  }
};

/* get post by id */

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
        comments: true,
      },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
};

/* make a comment */

export const createComment = async (id: string, comment: string) => {
  try {
    console.log(id);
    console.log(comment);
    await db.comment.create({
      data: {
        content: comment,
        postId: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
