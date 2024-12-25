import React from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface LikeDislikeStaticProps {
  likes: number
  dislikes: number
}

const LikeDislikeStatic: React.FC<LikeDislikeStaticProps> = ({ likes, dislikes }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-stone-100 text-stone-600 hover:bg-emerald-100 transition-colors duration-200"
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{likes}</span>
      </button>
      <button
        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-stone-100 text-stone-600 hover:bg-red-100 transition-colors duration-200"
      >
        <ThumbsDown className="w-4 h-4" />
        <span>{dislikes}</span>
      </button>
    </div>
  )
}

export default LikeDislikeStatic

// Example usage:
export function Component() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-emerald-800 mb-2">Trail Comment</h2>
      <p className="text-stone-700 mb-4">This trail was absolutely beautiful! The views were breathtaking.</p>
      <LikeDislikeStatic likes={42} dislikes={3} />
    </div>
  )
}