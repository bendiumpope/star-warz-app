const axios = require("axios").default;
const Comment = require("../models/commentModel");
const HttpError = require("../models/httpError");

exports.getMovies = async (req, res, next) => {
    try {
      const response = await axios.get("https://swapi.dev/api/films");

      const responseData = response.data.results.reduce((acc, movie) => {
        let movieObj = {
          episode_id: movie.episode_id,
          name: movie.title,
          opening_crawl: movie.opening_crawl,
          release_date: movie.release_date,
          comment_counts: 0,
        };
        acc.push(movieObj)

        return acc;
      }, []);

      const comments = await Comment.findAll();

      comments.forEach((comment) => {
        responseData.forEach(movie => {
          if (comment.movieId === movie.episode_id) {
            movie.comment_counts++;
           } 
        })
        
      });      

      responseData.sort((a, b) => {
        let dateA = new Date(a.release_date), dateB = new Date(b.release_date)
        return dateA - dateB;
      });
      // const data = JSON.stringify(responseData)
      return res.status(200).json(responseData);
    } catch (error) {
      return next(new HttpError(`Fetching movies failed ${error}`, 500));
    }
}

exports.getCharacters = async (req, res, next) => {

  try {
    const response = await axios("https://swapi.dev/api/people/");

    let sortValue = req.query.sort.split(":")[0];
    let sortType = req.query.sort.split(":")[1];
    let filterValue = req.query.filter;

    let responseData = await response.data.results;

    if (sortValue && sortType) {
      responseData.sort((a, b) => (a[sortValue] > b[sortValue] && 1) || -1);
    }
    if (sortType === 'dsc') {
      responseData.reverse();
    }

    if (filterValue) {
      responseData = responseData.filter((character) => {
        return character.gender == filterValue;
      });
    }

    const total_height_cm = responseData.reduce((sumHeight, character) => {
      return (+character.height) + sumHeight
    }, 0)

    const total_height_inches = total_height_cm * 0.0407647059;
    const total_height_ft = total_height_cm * 0.0294117647;


    return res.status(200).json({
      total_height_cm: `${total_height_cm}cm`,
      total_height_inches: `${total_height_inches.toFixed(2)}inches`,
      total_height_ft: `${total_height_ft.toFixed(2)}ft`,
      character_count: responseData.length,
      results: responseData,
    });
  } catch (error) {
    
    return next(new HttpError("Fetching users characters failed", 500));
  }
}
