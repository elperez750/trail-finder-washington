import React, { useState, useEffect } from "react";
import Button from "./Button";
import LikeDislikeStatic from "./LikeDislike";
import { useAuth } from "../context/AuthContext";
import SignInToView from "./SignInToView";

type CommentType = {
  name: string;
  avatar: string;
  comment: string;
  likes: number;
  dislikes: number;
};


const Comments = () => {
  const { user } = useAuth();

  const initialComments: CommentType[] = [
    {
      name: "Arnold Ngyuen",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      comment: "This trail was amazing!",
      likes: 42,
      dislikes: 3,
    },
    {
      name: "Katie Johnson",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
      comment: "I loved the views on this trail!",
      likes: 32,
      dislikes: 1,
    },
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      comment: "This trail was a bit too difficult for me.",
      likes: 12,
      dislikes: 7,
    },
  ];

  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [commentBody, setCommentBody] = useState<string>("");

  useEffect(() => {
    console.log("Current comments:", comments);
  }, [comments]);

  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    const newComment: CommentType = {
      name: user?.name || "Anonymous",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Default avatar
      comment: commentBody,
      likes: 0,
      dislikes: 0,
    };

    setComments((prev) => [...prev, newComment]);
    setCommentBody("");
  };

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
                  src={"https://randomuser.me/api/portraits/lego/2.jpg"}
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
            {comments.map((comment, index) => (
              <div
                key={`${comment.name}-${index}`}
                className="flex items-start space-x-3 p-4 border bg-stone-50 rounded-lg shadow-md"
              >
                {/* Comment Avatar */}
                <img
                  src={comment.avatar}
                  className="w-10 h-10 rounded-full bg-gray-950"
                  alt={comment.name}
                />
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    {/* Commenter Name and Date */}
                    <span className="font-semibold">{comment.name}</span>
                    <span className="text-sm text-gray-500">{date}</span>
                  </div>
                  {/* Comment Body */}
                  <p className="text-gray-800">{comment.comment}</p>
                  {/* Like/Dislike */}
                  <LikeDislikeStatic likes={comment.likes} dislikes={comment.dislikes} />
                </div>
              </div>
            ))}
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
