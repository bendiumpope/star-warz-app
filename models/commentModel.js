const Sequelize = require("sequelize");
const db = require("../utils/database");

const Comment = db.define("commentss", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  publicIp: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  movieId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Comment;
