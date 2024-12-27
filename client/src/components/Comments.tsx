import React, { useState, useEffect } from "react";
import Button from "./Button";
import LikeDislikeStatic from "./LikeDislike";
import { useAuth } from "../context/AuthContext";

type CommentType = {
  name: string;
  avatar: string;
  comment: string;
  likes: number;
  dislikes: number;
};

const Comments = () => {
  const { user } = useAuth();


  const userComments = [
    {
      name: "Arnold Ngyuen",
      avatar: "https://randomuser.me/api/portraits",
      comment: "This trail was amazing!",
      likes: 42,
      dislikes: 3,
    },
    {
      name: "Katie Johnson",
      avatar: "https://randomuser.me/api/portraits",
      comment: "I loved the views on this trail!",
      likes: 32,
      dislikes: 1,
    },
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
      comment: "This trail was a bit too difficult for me.",
      likes: 12,
      dislikes: 7,
    },
  ];

  const [comments, setComments] = useState<CommentType[]>(userComments);
  const [commentBody, setCommentBody] = useState<string>("");


  useEffect(() => {
    console.log("Comments", comments);
  }, [comments])


  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Comment", commentBody);
    const newComment = {
      name: user?.name || "Anonymous",
      avatar: "https://randomuser.me/api/portraits",
      comment: commentBody,
      likes: 0,
      dislikes: 0,
    };

    

    setComments([...comments,newComment]);
    setCommentBody("");


  }

  const date = new Date().toLocaleDateString();
  return (
    <div className="flex flex-col p-4 rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-emerald-800">Trail Comments</h2>

      {/* Form to add a new comment */}
      <form onSubmit={handleNewComment} className="mt-6">
        {/* User avatar and textarea */}
        <div className="flex items-start space-x-3 ">
          <div>
            <img src="" className="w-10 h-10 rounded-full bg-gray-950" alt="" />

            {user ? <h1>{user.name}</h1> : null}
          </div>

          <div className="flex flex-col flex-grow">
            {/* Textarea */}
            <textarea
              className="p-2 border-2 border-gray-300 rounded-lg"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Add a comment..."
            ></textarea>

            {/* Button directly below */}
            <div className="mt-4 self-start">
              <Button text="Add Comment" />
            </div>
          </div>
        </div>
      </form>

      {/* Comments */}

      {/* Single comment */}

      {comments.map((user) => (
        
        <div className="mt-10 space-y-4 border-1 bg-stone-50 rounded-lg shadow-md">
          <div className="flex items-start space-x-3 mx-4 my-2" key={user.name + user.comment}>
            <img
              src={user.avatar}
              className="w-10 h-10 rounded-full bg-gray-950"
              alt={user.name}
            />
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between">
                {/* User name and date */}
                <span className="font-semibold">{user.name}</span>
                <span className="text-sm text-gray-500">{date}</span>
              </div>
              {/* Comment  */}
              <p className="text-gray-800">{user.comment}</p>

              {/* Like and dislike buttons */}
              <LikeDislikeStatic likes={user.likes} dislikes={user.dislikes} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
