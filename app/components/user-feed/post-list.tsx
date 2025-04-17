"use client";
import { useState, useEffect } from "react";

import PostItem from "./post-item"
import PostSkeleton from "./post-skeleton"

export type Post = {
    id: number;
    title: string;
    url?: string;
    content: string;
    username: string;
    createdAt: string;
    upvotes: number;
    commentCount: number;
    rank: number;
  };

  export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await fetch("/api/posts");
            const data = await res.json();
            const postsWithRank = data.map((post: Post, index: number) => ({
                ...post,
                rank: index + 1,
            }));
            setPosts(postsWithRank);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const handleUpvote = async (postId: number) => {
        // Optimistically update UI
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? { ...post, upvotes: post.upvotes + 1 }
              : post
          )
        );
      
        try {
          const res = await fetch(`/api/posts/${postId}/upvote`, {
            method: "POST",
          });
      
          if (!res.ok) throw new Error("Upvote failed");
      
          const updated = await res.json();
      
          // Ensure state is accurate (in case server returned a different count)
          setPosts((prev) =>
            prev.map((post) =>
              post.id === updated.id ? { ...post, upvotes: updated.upvotes } : post
            )
          );
        } catch (error) {
          console.error("Error upvoting post:", error);
      
          // Revert optimistic update
          setPosts((prev) =>
            prev.map((post) =>
              post.id === postId
                ? { ...post, upvotes: post.upvotes - 1 }
                : post
            )
          );
        }
      };
      
    return(
        <div className="space-y-2">
            {loading ? (
                Array.from({ length: 5 }).map((_, idx) => <PostSkeleton key={idx} />)
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500 p-4">No posts available</p>
            ) : (
                posts.map((post) => (
                <PostItem key={post.id} post={post} onUpvote={handleUpvote} />
                ))
            )}
        </div>
    )
  }