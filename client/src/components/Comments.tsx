import React from "react";
import Button from "./Button";
import LikeDislikeStatic from "./LikeDislike";

const Comments = () => {
  return (
    <div className="flex flex-col border-2 p-4 rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-emerald-800">Trail Comments</h2>

      {/* Form to add a new comment */}
      <form onSubmit={(e) => e.preventDefault()} className="mt-6">
        {/* User avatar and textarea */}
        <div className="flex items-start space-x-3 ">
          <img src="" className="w-10 h-10 rounded-full bg-gray-950" alt="" />
          <div className="flex flex-col flex-grow">
            {/* Textarea */}
            <textarea
              className="p-2 border-2 border-gray-300 rounded-lg"
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
      <div className="mt-10 space-y-4 border-4 bg-slate-200 rounded-lg">
        {/* Single comment */}
        <div className="flex items-start space-x-3">
          <img src="" className="w-10 h-10 rounded-full bg-gray-950" alt="" />
          <div className="flex flex-col flex-grow">
            <div className="flex items-center justify-between">
              {/* User name and date */}
              <span className="font-semibold">Arnold Ngyuen</span>
              <span className="text-sm text-gray-500">Date</span>
            </div>
            {/* Comment  */}
            <p className="text-gray-800">This trail was amazing!</p>

            {/* Like and dislike buttons */}
            <LikeDislikeStatic likes={42} dislikes={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
