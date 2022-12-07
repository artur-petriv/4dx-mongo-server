const { HallRow } = require("../models/models");
const ApiError = require("../errors/ApiError");

class HallRowController {
  async create(req, res, next) {
    // try {
    //   console.log(req.body);
    //   return;
    //   return res.json(allResults);
    // } catch (err) {
    //   next(ApiError.badRequest(err.message));
    // }
  }

  async getAll(req, res, next) {
    try {
      const result = await HallRow.findAll();

      return res.json(result);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new HallRowController();
