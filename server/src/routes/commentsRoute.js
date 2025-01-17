const { Router } = require('express');
const Comment = require('../models/commentsModel');

const commentsRouter = Router();

// Get comments by trail ID
commentsRouter.get('/comments-by-hike', async (req, res) => {
  const hikeId = req.query.hikeId;

  try {
    const comments = await Comment.find({ hikeId });
    console.log("comments", comments)
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});



// Add a new comment
commentsRouter.post('/add-comment', async (req, res) => {
  console.log("req.body", req.body);
  const { userId, hikeId, username, content } = req.body;

  if (!userId || !hikeId || !username || !content) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const newComment = new Comment({
      userId,
      hikeId,
      username,
      content,
      createdAt: Date.now(),
      likes: 0,
      dislikes: 0,
    });

    await newComment.save();


    const savedComment = await Comment.findById(newComment._id);

    
    res.status(200).json(savedComment);
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});



// Update likes
commentsRouter.patch('/update-like', async (req, res) => {
  const commentId = req.query.commentId;
  const userAction = req.query.userAction;

  try {
    const updateQuery =
      userAction === 'dislike'
        ? { $inc: { likes: 1, dislikes: -1 } }
        : { $inc: { likes: 1 } };

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updateQuery,
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    res.status(200).json({
      likes: updatedComment.likes,
      dislikes: updatedComment.dislikes,
    });
  } catch (err) {
    console.error("Error updating likes:", err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// Update dislikes
commentsRouter.patch('/update-dislike', async (req, res) => {
  const commentId = req.query.commentId;
  const userAction = req.query.userAction;

  try {
    const updateQuery =
      userAction === 'like'
        ? { $inc: { dislikes: 1, likes: -1 } }
        : { $inc: { dislikes: 1 } };

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updateQuery,
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    res.status(200).json({
      likes: updatedComment.likes,
      dislikes: updatedComment.dislikes,
    });
  } catch (err) {
    console.error("Error updating dislikes:", err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// Delete a comment
commentsRouter.delete('/delete-comment', async (req, res) => {
  const commentId = req.query.commentId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    await comment.deleteOne();
    res.status(200).json({ msg: 'Comment deleted successfully' });
  } catch (err) {
    console.error("Error deleting comment:", err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});


module.exports = commentsRouter;

