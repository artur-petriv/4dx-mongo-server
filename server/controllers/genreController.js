const { Genre } = require('../models/models');
const ApiError = require('../errors/ApiError');

class GenreController {
  async create(req, res) {
    try {
      const { name, value } = req.body;
      const result = await Genre.create({ name, value });
      return res.json(result);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const genres = await Genre.findAll({ order: [['name', 'ASC']] });
      return res.json(genres);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new GenreController();
