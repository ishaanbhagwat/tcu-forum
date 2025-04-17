import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const postId = params.id;
  
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    console.log("Post found:", post);
    
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        upvotes: post.upvotes + 1
      }
    });
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating upvotes:", error);
    return NextResponse.json({ error: "Failed to upvote" }, { status: 500 });
  }
}