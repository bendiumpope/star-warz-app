const axios = require("axios").default;
const Comment = require("../models/commentModel");
const HttpError = require("../models/httpError");
const movieFeatures = require("./movieFeatures");

exports.getMovies = async (req, res, next) => {
  try {
    const response = await axios.get("https://swapi.dev/api/films");
    const comments = await Comment.findAll();
    const responseData = await movieFeatures.getMoviesFeatures(
      response,
      comments
    );

    return res.status(200).json({
      status: 200,
      result: responseData,
    });
  } catch (error) {
    return next(new HttpError(`Fetching movies failed ${error}`, 500));
  }
};

exports.getCharacters = async (req, res, next) => {
  try {
    const response = await axios("https://swapi.dev/api/people/");
    
    let queryString = req.query ? req.query : "";
    const responseData = await movieFeatures.getCharactersFeatures({
      response,
      queryString
    });
    responseData.status = 200;

    return res.status(200).json(responseData);
  } catch (error) {
    return next(new HttpError(`Fetching characters failed ${error}`, 500));
  }
};
