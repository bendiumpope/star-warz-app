const Comment = require("../models/commentModel");
const HttpError = require("../models/httpError");
const publicIp = require("public-ip");

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();

    if (comments.length > 1) {
      comments.reverse();
    }

    return res.status(200).json(comments);
  } catch (error) {
    return next(new HttpError("Fetching comments failed", 500));
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    return res.status(200).json(comment);
  } catch (error) {
    return next(new HttpError("Fetching comment failed", 500));
  }
};

exports.createComment = async (req, res, next) => {
  const ip = await publicIp.v4();

  const COMMENT_MODEL = {
    comment: req.body.comment.trim(),
    movieId: +req.params.movieId,
    publicIp: ip,
  };
    if (req.body.comment.trim().length > 500) {
      return next(
        new HttpError(
          "Comment length should not be more than 500 characters",
          500
        )
      );
    }
  try {
    const comment = await Comment.create(COMMENT_MODEL);
    return res.status(200).json(comment);
  } catch (error) {
    return next(new HttpError("Creating comment failed", 500));
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const COMMENT_MODEL = {
      comment: req.body.comment,
    };

    const comment = await Comment.update(COMMENT_MODEL, {
      where: { id: req.params.commentId },
    });
    return res.status(200).json(comment);
  } catch (error) {
    return next(new HttpError("Updating comment failed", 500));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.destroy({
      where: { id: req.params.commentId },
    });
    return res.status(201).json(comment);
  } catch (error) {
    return next(new HttpError("Deleting comment failed", 500));
  }
};
