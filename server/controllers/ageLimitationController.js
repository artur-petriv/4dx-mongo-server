const { AgeLimitation } = require('../models/models');
const ApiError = require('../errors/ApiError');

class AgeLimitationController {
  async create(req, res, next) {
    try {
      const { value, name } = req.body;
      const result = await AgeLimitation.create({ value, name });
      return res.json(result);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const ageLimitation = await AgeLimitation.findAll({ order: [['name', 'ASC']] });
      return res.json(ageLimitation);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new AgeLimitationController();
