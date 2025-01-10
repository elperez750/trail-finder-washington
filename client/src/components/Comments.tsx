import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import SignInToView from "./SignInToView";
import { NoComments } from "./NoComments";
import { fetchCommentsByTrailId, postNewComment } from "../api/Comment";
import { CommentType } from "../api/Comment";
import { IndividualComment } from "./IndividualComment";

// This is to get the specific comments for a trail.
type CommentsProps = {
  trailId: string;
};

const Comments = ({ trailId }: CommentsProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentBody, setCommentBody] = useState<string>("");

  const handleFetchComments = useCallback(async () => {
    try {
      const fetchedComments = await fetchCommentsByTrailId(trailId);
      setComments(fetchedComments);
    } catch (err) {
      console.error("Error fetching the data:", err);
    }
  }, [trailId]);


  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    try {
      await postNewComment({
        hikeId: trailId,
        userId: user?.id || "",
        username: user?.name || "Anonymous",
        content: commentBody,
      });
    
      handleFetchComments();

      setCommentBody("");

    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => {
    handleFetchComments();
  }, [handleFetchComments]);



  return (
    <div className="flex flex-col p-4 rounded-lg mt-10">
      {user ? (
        <>
          <h2 className="text-3xl font-bold text-emerald-800">Trail Comments</h2>
          {/* Form to add a new comment */}
          <form
            onSubmit={
              handleNewComment
            }
            className="mt-6"
          >
            <div className="flex items-start space-x-3">
              {/* User Avatar */}
              <div>
                <img
                  src={user.email || "https://example.com/default-avatar.jpg"}
                  className="w-10 h-10 rounded-full bg-gray-950"
                  alt={user?.name || "User"}
                />
                <h1 className="text-sm text-gray-600">{user?.name || "Anonymous"}</h1>
              </div>
              {/* Comment Textarea */}
              <div className="flex flex-col flex-grow">
                <textarea
                  className="p-2 border-2 border-gray-200 shadow-lg rounded-lg w-full"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Add a comment..."
                  rows={5}
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
              
              comments.map((comment) => {

                return(
                <IndividualComment
                  comment={comment}
                  key={comment?._id}
                  comments={comments}
                  setComments={setComments}
                />
                )
})
            ) : (
              <NoComments />
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
