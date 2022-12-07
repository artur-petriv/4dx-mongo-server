const Router = require("express");
const router = new Router();
const hallRowController = require("./../controllers/hallRowController");

router.post("/", hallRowController.create);
router.get("/", hallRowController.getAll);

module.exports = router;
