import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { CommentType } from "../api/Comment";
import axios from "axios";
import BASE_URL from "../api/services";


interface LikeDislikeStaticProps {
  comment: CommentType;
}

type UserActionType = "like" | "dislike" | null;

const LikeDislike: React.FC<LikeDislikeStaticProps> = ({ comment }) => {
  const [like, setLikes] = useState<number>(comment.likes);
  const [dislike, setDislikes] = useState<number>(comment.dislikes);

  const [userAction, setUserAction] = useState<UserActionType>(null);

  const handleDislike = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/comments/update-dislike?commentId=${comment._id}&userAction=${userAction}`
      );

      const newDislikeCount = response.data.dislikes;
      const newLikeCount = response.data.likes;

      setDislikes(newDislikeCount); //Dislikes + 1
      setLikes(newLikeCount); //Likes - 1

      if (userAction === null || userAction === "like") {
        setUserAction("dislike");
      }
    } catch (err) {
      console.error("Error updating dislikes:", err);
    }
  };

  const handleLikes = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/comments/update-like?commentId=${comment?._id}&userAction=${userAction}`
      );
      const newLikeCount = response.data.likes;
      const newDislikeCount = response.data.dislikes;

      setLikes(newLikeCount); //Likes + 1
      setDislikes(newDislikeCount); //Dislikes - 1
      if (userAction === null || userAction === "dislike") {
        setUserAction("like");
      }
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  useEffect(() => {
    console.log(`Likes: ${like}, Dislikes: ${dislike}`);
  }, [like, dislike]); // Runs whenever likes or dislikes change

  return (
    <div className="flex items-center space-x-4 mt-2">
      <button
        onClick={handleLikes}
        disabled={userAction === "like" ? true : false}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
          userAction === "like" ? "bg-emerald-100" : "bg-stone-100"
        } text-stone-600 hover:bg-emerald-100 transition-colors duration-200`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{like}</span>
      </button>
      <button
        onClick={handleDislike}
        disabled={userAction === "dislike" ? true : false}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
          userAction === "dislike" ? "bg-red-300" : "bg-stone-100"
        } text-stone-600 hover:bg-red-300 transition-colors duration-200`}
      >
        <ThumbsDown className="w-4 h-4" />
        <span>{dislike}</span>
      </button>
    </div>
  );
};

export default LikeDislike;
