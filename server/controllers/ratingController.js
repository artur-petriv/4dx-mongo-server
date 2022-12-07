const { Rating } = require("./../models/models");
const ApiError = require("./../errors/ApiError");

class RatingController {
  async create(req, res, next) {
		try {
			const { rate, filmId } = req.body;
			const rating = await Rating.create({ rate, filmId });
			return res.json(rating);
		} catch (err) {
			next(ApiError.badRequest(err.message));
		}
	}

  async getAll(req, res, next) {}
}

module.exports = new RatingController();
