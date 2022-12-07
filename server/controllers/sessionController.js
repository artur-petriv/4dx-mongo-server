const { Session, Format } = require("../models/models");
const ApiError = require("../errors/ApiError");
const { determineDaysBetween } = require("../utils/dateConvertor");

class SessionController {
  async create(req, res, next) {
    try {
      const { start_date, end_date, time, price, filmId, formatId } = req.body;
      const daysList = determineDaysBetween(start_date, end_date);

      const allResults = daysList.map(async (day) => {
        return await Session.create({
          date: day,
          time,
          price,
          filmId,
          formatId,
        }).then((data) => {
          return data;
        });
      });

      return res.json(allResults);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { filmId, dayDate } = req.query;

      const session = await Session.findAll({
        where: {
          filmId,
          date: dayDate,
        },
        include: [{ model: Format }],
      });

      return res.json(session);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new SessionController();
