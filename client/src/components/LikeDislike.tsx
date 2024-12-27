import React, {useState} from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface LikeDislikeStaticProps {
  likes: number
  dislikes: number
}

type UserActionType = 'like' | 'dislike' | null;


const LikeDislikeStatic: React.FC<LikeDislikeStaticProps> = ({ likes, dislikes }) => {
  const [like, setLikes] = useState(likes)
  const [dislike, setDislikes] = useState(dislikes)
  const [isClicked, setIsClicked] = useState<{like: boolean, dislike: boolean}>({like: false, dislike: false});
  const [userAction, setUserAction] = useState<UserActionType>(null);


  const handleDislike = () => {
    setDislikes(dislike + 1)
    setIsClicked({like: false, dislike: true})

    if (userAction === null) {
      setUserAction('dislike')
    }
    else{
      setLikes(like - 1)
    }
  }


  const handleLikes = () => {
    setLikes(like + 1)
    setIsClicked({dislike: false, like: true})
    if (userAction === null) {
      
      setUserAction('like')

    }
    else{
      setDislikes(dislike - 1)
    }
    
  }


  return (
    <div className="flex items-center space-x-4">
      <button
      onClick = {handleLikes}
      disabled = {isClicked.like? true: false}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${isClicked.like? 'bg-emerald-100': 'bg-stone-100'} text-stone-600 hover:bg-emerald-100 transition-colors duration-200`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{like}</span>
      </button>
      <button
        onClick = { handleDislike}
        disabled = {isClicked.dislike? true: false}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${isClicked.dislike ? 'bg-red-300' : 'bg-stone-100'} text-stone-600 hover:bg-red-300 transition-colors duration-200`}
      >
        <ThumbsDown className="w-4 h-4" />
        <span>{dislike}</span>
      </button>
    </div>
  )
}

export default LikeDislikeStatic
