import React, { useCallback } from "react";
import { CommentType } from "../api/Comment";
import  LikeDislike  from "./LikeDislike"
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { deleteComment } from "../api/Comment";

type IndividualCommentProps = {
  comment: CommentType;
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

export const IndividualComment: React.FC<IndividualCommentProps> = ({
  comment,
  comments,
  setComments,
}) => {

  const { user } = useAuth();

  const parseDate = useCallback((dateString: string) => {
    const datePosted = new Date(dateString);
    const now = new Date();
    const timeDifferenceMilliseconds = now.getTime() - datePosted.getTime();
    const timeDiffferenceInSeconds = Math.floor(
      timeDifferenceMilliseconds / 1000
    );
    const timeDifferenceInMinutes = Math.floor(timeDiffferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    if (timeDiffferenceInSeconds < 60) {
      return "Just now";
    } else if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minute${
        timeDifferenceInMinutes === 1 ? "" : "s"
      } ago`;
    } else if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hour${
        timeDifferenceInHours === 1 ? "" : "s"
      } ago`;
    } else if (timeDifferenceInDays < 7) {
      return `${timeDifferenceInDays} day${
        timeDifferenceInDays === 1 ? "" : "s"
      } ago`;
    } else if (timeDifferenceInDays < 30) {
      const weeks = Math.floor(timeDifferenceInDays / 7);
      return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    } else if (timeDifferenceInDays < 365) {
      const months = Math.floor(timeDifferenceInDays / 30);
      return `${months} month${months === 1 ? "" : "s"} ago`;
    } else {
      const years = Math.floor(timeDifferenceInDays / 365);
      return `${years} year${years === 1 ? "" : "s"} ago`;
    }
  }, []);

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((item) => item?._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete the comment. Please try again.");
    }
  };

  return (
    <div className="flex items-start space-x-3 p-4 border bg-stone-50 rounded-lg shadow-md">
      {/* Comment Avatar */}
      <div>
        <img
          src={comment?.avatar || "https://example.com/default-avatar.jpg"}
          className="w-10 h-10 rounded-full bg-gray-950"
          alt={comment?.username}
        />
      </div>

      {/* Comment Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          {/* Commenter Name */}
          <span className="font-semibold">{comment?.username}</span>
          {/* Comment Date */}
          <span className="text-sm text-gray-500">{parseDate(comment?.createdAt)}</span>
          {/* Delete Button */}
          {user?.id === comment?.userId && (
            <button
              className="w-5 h-5 text-red-600 hover:bg-gray-100 transition-all duration-200 ease-in-out rounded-md"
              onClick={() => handleDeleteComment(comment?._id)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Comment Body */}
        <p className="text-gray-800">{comment?.content}</p>
       

        {/* Like/Dislike */}
        <LikeDislike comment={comment} />
      </div>
    </div>
  );
};
