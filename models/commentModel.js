const Sequelize = require("sequelize");
const db = require("../utils/database");

const Comment = db.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  publicIp: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  movieId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Comment;
