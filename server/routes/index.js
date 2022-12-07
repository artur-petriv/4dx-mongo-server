const Router = require("express");
const router = new Router();

const filmRouter = require("./filmRouter");
const userRouter = require("./userRouter");
const genreRouter = require("./genreRouter");
const formatRouter = require("./formatRouter");
const ratingRouter = require("./ratingRouter");
const ageLimitationRouter = require("./ageLimitationRouter");
const sessionRouter = require("./sessionRouter");
const ticketRouter = require("./ticketRouter");
const hallRowRouter = require("./hallRowRouter");

router.use("/ageLimitation", ageLimitationRouter);
router.use("/user", userRouter);
router.use("/film", filmRouter);
router.use("/rating", ratingRouter);
router.use("/genre", genreRouter);
router.use("/format", formatRouter);
router.use("/session", sessionRouter);
router.use("/ticket", ticketRouter);
router.use("/hallRow", hallRowRouter);

module.exports = router;
