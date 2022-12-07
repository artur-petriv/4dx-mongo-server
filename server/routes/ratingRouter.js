const Router = require("express");
const router = new Router();
const RatingController = require("./../controllers/ratingController");

router.post("/", RatingController.create);
router.get("/", RatingController.getAll);

module.exports = router;
