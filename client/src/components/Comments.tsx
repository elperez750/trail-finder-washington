import React, { useState, useEffect } from "react";
import Button from "./Button";
import LikeDislike from "./LikeDislike";
import { useAuth } from "../context/AuthContext";
import SignInToView from "./SignInToView";
import axios from "axios";

type CommentType = {
  _id: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  dislikes: number;
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
    } catch (err) {
      console.error("Error fetching comments:", err);
    }


  }


  useEffect(() => {
    fetchComments();
  }, []);
  


  // Handle adding a new comment
  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    try {
      const response = await axios.post<CommentType>("http://localhost:8000/api/comments/add-comment", {
        hikeId: trailId,
        userId: user?.id,
        username: user?.name || "Anonymous",
        content: commentBody

      });
      const newComment = response.data;
      setComments([...comments, newComment]);
      setCommentBody("");
    


      
    }
    catch (err) {
      console.error("Error adding comment:", err);
    }

  }
  

  const date = new Date().toLocaleDateString();

  return (
    <div className="flex flex-col p-4 rounded-lg mt-10">
      {user ? (
        <>
          <h2 className="text-3xl font-bold text-emerald-800">Trail Comments</h2>

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
                <h1 className="text-sm text-gray-600">{user?.name || "Anonymous"}</h1>
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
                      <span className="text-sm text-gray-500">{date}</span>
                    </div>
                    {/* Comment Body */}
                    <p className="text-gray-800">{comment.content}</p>
                    {/* Like/Dislike */}
                    <LikeDislike
                      
                      comment={comment}
                    />
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
