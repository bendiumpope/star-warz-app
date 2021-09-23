const axios = require("axios").default;

exports.getAll = async (req, res, next) => {
    try {
      const response = await axios.get("https://swapi.dev/api/films");

      const data = JSON.stringify(response.data)
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
}
