const Comment = require("../models/commentModel");
const HttpError = require("../models/httpError");
const publicIps = require("public-ip");

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();

    if (comments.length > 1) {
      comments.reverse();
    }

    return res.status(200).json({
      status: 200,
      comments,
    });
  } catch (error) {
    return next(new HttpError("Fetching comments failed", 500));
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    return res.status(200).json({
      status: 200,
      comment,
    });
  } catch (error) {
    return next(new HttpError("Fetching comment failed", 500));
  }
};

exports.createComment = async (req, res, next) => {
  try {
    let comment = req.body.comment.trim();
    let movieId = +req.params.movieId;
    let publicIp = await publicIps.v4();

    if (!comment || comment.length > 500) {
      return next(
        new HttpError(
          "Comment length should not be empty or more than 500 characters",
          500
        )
      );
    }
    if (!movieId || !publicIp) {
      return next(
        new HttpError(
          "Please pass the movieId of the movie you want to comment on as a parameter on the route",
          500
        )
      );
    }
    const COMMENT_MODEL = {
      comment,
      movieId,
      publicIp,
    };
    const savedComment = await Comment.create(COMMENT_MODEL);
    return res.status(200).json({
      status: 200,
      savedComment,
    });
  } catch (error) {
    return next(new HttpError("Creating comment failed", 500));
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const comment = req.body.comment.trim();
    const commentId = req.params.commentId;

    if (!comment || comment.length > 500) {
      return next(
        new HttpError(
          "Comment length should not be empty or more than 500 characters",
          500
        )
      );
    }

    if (!commentId) {
      return next(
        new HttpError(
          "Please pass the commentId of the comment you want to update as a parameter on the route",
          500
        )
      );
    }

    const COMMENT_MODEL = {
      comment: req.body.comment,
    };

    const updatedComment = await Comment.update(COMMENT_MODEL, {
      where: { id: commentId },
    });
    return res.status(200).json({
      status: 200,
      updatedComment,
    });
  } catch (error) {
    return next(new HttpError("Updating comment failed", 500));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    if (!commentId) {
      return next(
        new HttpError(
          "Please pass the commentId of the comment you want to update as a parameter on the route",
          500
        )
      );
    }
    const comment = await Comment.destroy({
      where: { id: commentId },
    });
    return res.status(201).json(comment);
  } catch (error) {
    return next(new HttpError("Deleting comment failed", 500));
  }
};
