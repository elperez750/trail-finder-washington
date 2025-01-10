import axios from "axios";


//Type of comment. _id, userId, likes, dislikes, createdAt are not passed by the user.
export interface NewCommentType {
  hikeId: string;
  userId: string;
  username: string;
  content: string;
}


export interface CommentType extends NewCommentType {
  _id: string;
  avatar: string;
  likes: number;
  dislikes: number;
  createdAt: string;
};


export const fetchCommentsByTrailId = async (trailId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/comments/comments-by-hike?hikeId=${trailId}`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw err; // Propagate the error to the caller
  }
};



export const postNewComment = async ({ hikeId, userId, username, content }: NewCommentType) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/comments/add-comment`, {
      hikeId,
      userId,
      username,
      content,
    });
    console.log("New comment posted:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error posting new comment:", err);
    throw err; // Propagate the error to the caller
  }
};


export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/comments/delete-comment?commentId=${commentId}`
    );
    console.log("Comment deleted:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err; // Propagate the error to the caller
  }
};
