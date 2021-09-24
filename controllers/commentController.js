const Comment = require("../models/commentModel");

exports.getComments = async (req, res, next) => {
  try {
    const comments = await User.findAll();
    
      if (comments.length > 1) {
          comments.reverse();
      }
      
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const comment = await User.findByPk(req.params.commentId);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createComment = async (req, res, next) => {
  const COMMENT_MODEL = {
    comment: req.body.comment,
    movieId: req.params.movieId
  };

  try {
    const comment = await Comment.create(COMMENT_MODEL);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// exports.updateOne = async (req, res, next) => {
//   try {
//     const USER_MODEL = {
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     };
//     const user = await User.update(USER_MODEL, {
//       where: { id: req.params.id },
//     });
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// exports.deleteOne = async (req, res, next) => {
//   try {
//     const user = await User.destroy({ where: { id: req.params.id } });
//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

