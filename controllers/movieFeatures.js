const { response } = require("express");

exports.getMoviesFeatures = async (response, comments) => {
    
  const responseData = response.data.results.reduce((acc, movie) => {
    let movieObj = {
      episode_id: movie.episode_id,
      name: movie.title,
      opening_crawl: movie.opening_crawl,
      release_date: movie.release_date,
      comment_counts: 0,
    };
    acc.push(movieObj);

    return acc;
  }, []);

  comments.forEach((comment) => {
    responseData.forEach((movie) => {
      if (comment.movieId === movie.episode_id) {
        movie.comment_counts++;
      }
    });
  });

  responseData.sort((a, b) => {
    let dateA = new Date(a.release_date),
      dateB = new Date(b.release_date);
    return dateA - dateB;
  });
    
    return responseData;
};

exports.getCharactersFeatures = async (responseObj) => {

        let responseData = await responseObj.response.data.results;

        if (responseObj.sortValue && responseObj.sortType) {
          responseData.sort(
            (a, b) =>
              (a[responseObj.sortValue] > b[responseObj.sortValue] && 1) || -1
          );
        }
        if (responseObj.sortType === "dsc") {
          responseData.reverse();
        }

        if (responseObj.filterValue) {
          responseData = responseData.filter((character) => {
            return character.gender == responseObj.filterValue;
          });
        }

        const total_height_cm = responseData.reduce((sumHeight, character) => {
          return +character.height + sumHeight;
        }, 0);

        const total_height_inches = total_height_cm * 0.0407647059;
        const total_height_ft = total_height_cm * 0.0294117647;
    
    return {
        total_height_cm: `${total_height_cm}cm`,
        total_height_inches: `${total_height_inches.toFixed(2)}inches`,
        total_height_ft: `${total_height_ft.toFixed(2)}ft`,
        character_count: responseData.length,
        results: responseData
    }
    
}
