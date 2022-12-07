const Router = require("express");
const router = new Router();
const ageLimitationController = require("./../controllers/ageLimitationController");

router.post("/", ageLimitationController.create);
router.get("/", ageLimitationController.getAll);

module.exports = router;
