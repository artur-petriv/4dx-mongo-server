const { Format } = require('./../models/models');
const ApiError = require('./../errors/ApiError');

class FormatController {
  // async destroy(req, res, next) {
  //   const films = await Format.destroy({ where: { id: 4 } });
  // }

  async create(req, res) {
    try {
      const { name, value } = req.body;
      const result = await Format.create({ name, value });
      return res.json(result);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const formats = await Format.findAll({ order: [['name', 'ASC']] });
      return res.json(formats);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new FormatController();
