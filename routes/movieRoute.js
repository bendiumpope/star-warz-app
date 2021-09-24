const router = require("express").Router();
const controller = require("../controllers/movieController");

router.get("/movies", controller.getMovies);
router.get("/characters", controller.getCharacters);

module.exports = router;
