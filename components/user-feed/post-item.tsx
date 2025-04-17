"use client"

import { ArrowUpIcon } from "lucide-react"

interface Post{
    id: number
    title: string
    url?: string
    content: string
    username: string
    createdAt: string
    upvotes: number
    commentCount: number
    rank: number
}

interface PostItemProps{
    post: Post
    onUpvote: (postId: number) => void
}

export default function PostItem({post, onUpvote}: PostItemProps){
    const timeSince = (rawDate: string | Date) => {
        const date = new Date(rawDate);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
        const intervals = [
          { label: "year", seconds: 31536000 },
          { label: "month", seconds: 2592000 },
          { label: "day", seconds: 86400 },
          { label: "hour", seconds: 3600 },
          { label: "minute", seconds: 60 },
          { label: "second", seconds: 1 },
        ]
    
        for (let i = 0; i < intervals.length; i++) {
          const interval = intervals[i]
          const count = Math.floor(seconds / interval.seconds)
          if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`
          }
        }
        return "just now"
      }

      return(
        <div className="p-1">
            <div className="flex items-center space-x-1">
                <span className="text-gray-500 font-small ">{post.rank}</span>
                <button onClick={() => onUpvote(post.id)} className="text-gray-500 hover:text-orange-500 transition-colors">
                    <ArrowUpIcon size={16}/>
                </button>
                <h4 className="text-small font-semibold">
                    {post.title}
                    {post.url && <span className="text-gray-500 font-normal ml-2">({new URL(post.url).hostname})</span>}
                </h4>
            </div>
            <div className="mt-1 text-xs text-gray-600 flex items-center space-x-2">
                <span>
                    <span>{post.upvotes} point{post.upvotes !== 1 ? "s" : ""}</span>
                </span>
                <span>by {post.username}</span>
                <span>{timeSince(post.createdAt)}</span>
                <span>|</span>
                <a href={'/posts/${postId}'} className="text-gray-700 hover:underline">
                {post.commentCount} comment{post.commentCount !== 1 ? "s" : ""}
                </a>
            </div>
        </div>
      )
}