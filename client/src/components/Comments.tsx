import React, { useState, useEffect } from "react";
import Button from "./Button";
import LikeDislike from "./LikeDislike";
import { useAuth } from "../context/AuthContext";
import SignInToView from "./SignInToView";
import axios from "axios";
import { Trash2 } from "lucide-react";

type CommentType = {
  _id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
};

type CommentsProps = {
  trailId: string;
};

const Comments = ({ trailId }: CommentsProps) => {
  const { user } = useAuth();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentBody, setCommentBody] = useState<string>("");

  // Fetch comments from the server
  const fetchComments = async () => {
    try {
      const hikeComments = await axios.get(
        `http://localhost:8000/api/comments/comments-by-hike?hikeId=${trailId}`
      );
      setComments(hikeComments.data);
      console.log(hikeComments.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);


  //Function to parse the date and return a human-readable string
  const parseDate = (dateString: string) => {
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

  };

  // Handle adding a new comment
  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    try {
      const response = await axios.post<CommentType>(
        "http://localhost:8000/api/comments/add-comment",
        {
          hikeId: trailId,
          userId: user?.id,
          username: user?.name || "Anonymous",
          content: commentBody,
        }
      );
      const newComment = response.data;
      setComments([...comments, newComment]);
      setCommentBody("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };


  const deleteComment = async (commentId: string) => {
    try{
      await axios.delete(`http://localhost:8000/api/comments/delete-comment?commentId=${commentId}`)
      setComments(comments.filter((comment) => comment._id !== commentId))
    }
catch(err){
      console.error("Error deleting comment:", err);
    }


  }

  return (
    <div className="flex flex-col p-4 rounded-lg mt-10">
      {user ? (
        <>
          <h2 className="text-3xl font-bold text-emerald-800">
            Trail Comments
          </h2>

          {/* Form to add a new comment */}
          <form onSubmit={handleNewComment} className="mt-6">
            <div className="flex items-start space-x-3">
              {/* User Avatar */}
              <div>
                <img
                  src="https://randomuser.me/api/portraits/lego/2.jpg"
                  className="w-10 h-10 rounded-full bg-gray-950"
                  alt={user?.name || "User"}
                />
                <h1 className="text-sm text-gray-600">
                  {user?.name || "Anonymous"}
                </h1>
              </div>

              {/* Comment Textarea */}
              <div className="flex flex-col flex-grow">
                <textarea
                  className="p-2 border-2 border-gray-300 rounded-lg w-full"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                />
                <div className="flex mt-2">
                  <Button text="Add Comment" />
                </div>
              </div>
            </div>
          </form>

          {/* List of Comments */}
          <div className="mt-10 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={`${comment.username}-${index}`}
                  className="flex items-start space-x-3 p-4 border bg-stone-50 rounded-lg shadow-md"
                >
                  {/* Comment Avatar */}
                  <img
                    src={comment.avatar}
                    className="w-10 h-10 rounded-full bg-gray-950"
                    alt={comment.username}
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      {/* Commenter Name and Date */}
                      <span className="font-semibold">{comment.username}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">
                          {parseDate(comment.createdAt)}
                        </span>
                        {user?.id === comment.userId && (
                          <Trash2
                            onClick={() => deleteComment(comment._id)} 
                            className="w-5 h-5 text-red-600 cursor-pointer" />
                        )}
                      </div>
                    </div>

                    {/* Comment Body */}
                    <p className="text-gray-800">{comment.content}</p>
                    {/* Like/Dislike */}
                    <LikeDislike comment={comment} />
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <SignInToView />
        </div>
      )}
    </div>
  );
};

export default Comments;
