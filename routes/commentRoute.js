const { mainModule } = require("process");
const controller = require("../controllers/commentController");
const router = require("express").Router();

router.get('/', controller.getComments);
router.get("/:commentId", controller.getComment);
router.post('/:movieId', controller.createComment);
// router.patch('/:commentId', controller.updateComment);
// router.delete('/:commentId', controller.deleteComment);

module.exports = router; 
