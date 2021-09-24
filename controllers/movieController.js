const axios = require("axios").default;

exports.getAll = async (req, res, next) => {
    try {
      const response = await axios.get("https://swapi.dev/api/films");

      const responseData = response.data.results.reduce((acc, movie) => {
        let movieObj = {
          episode_id: movie.episode_id,
          name: movie.title,
          opening_crawl: movie.opening_crawl,
          release_date: movie.release_date,
          characters: movie.characters,
          comment_counts: 0,
          comments: []
        };
        acc.push(movieObj)

        return acc;
      }, [])

      responseData.sort((a, b) => {
        let dateA = new Date(a.release_date), dateB = new Date(b.release_date)
        return dateA - dateB;
      });
      // const data = JSON.stringify(responseData)
      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
    }
}
