const router = require("express").Router();
const controller = require("../controllers/movieController");

router.get("/", controller.getAll);

module.exports = router;
