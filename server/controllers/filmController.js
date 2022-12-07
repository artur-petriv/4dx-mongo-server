const {
  Film,
  Genre,
  Format,
  FilmGenre,
  FilmFormat,
  Session,
  AgeLimitation,
} = require("./../models/models");
const ApiError = require("./../errors/ApiError");
const { Op } = require("sequelize");

class FilmController {
  async create(req, res, next) {
    try {
      let {
        name,
        year,
        country,
        language,
        img,
        trailer,
        rating,
        duration,
        ageLimitationSelected,
        genresSelected,
        formatsSelected,
        // startDate,
        // endDate,
      } = req.body;

      let rate, ageLimitation, genres, formats;

      const film = await Film.create({
        name,
        year,
        country,
        language,
        img,
        trailer,
        duration,
        rating,
        startDate: "2022-01-04",
        endDate: "2022-01-04",
        ageLimitationId: ageLimitationSelected.id,
      });

      if (genresSelected) {
        Object.keys(genresSelected).forEach(async (genre) => {
          if (genresSelected[genre].checked)
            genres = await FilmGenre.create({
              genreId: genresSelected[genre].id,
              filmId: film.id,
            });
        });
      }

      if (formatsSelected) {
        Object.keys(formatsSelected).forEach(async (format) => {
          if (formatsSelected[format].checked)
            formats = await FilmFormat.create({
              formatId: formatsSelected[format].id,
              filmId: film.id,
            });
        });
      }

      return res.json({ film, rate, ageLimitation, genres, formats });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const {
        sortSelected,
        ageLimitationSelected,
        genresSelectedStr,
        formatsSelectedStr,
        page = 1,
        limit = 2,
      } = req.query;
      const offset = page * limit - limit;

      // Genres transform
      const genresSelected = JSON.parse(genresSelectedStr);
      const genresSelectedArr = Object.keys(genresSelected).reduce(
        (arr, id) => {
          genresSelected[id] && arr.push(Number(id));
          return arr;
        },
        []
      );

      // Formats transform
      const formatsSelected = JSON.parse(formatsSelectedStr);
      const formatsSelectedArr = Object.keys(formatsSelected).reduce(
        (arr, id) => {
          formatsSelected[id] && arr.push(Number(id));
          return arr;
        },
        []
      );

      // const getDate = new Date();
      // const curDate = convertDate(getDate);

      const options = {
        where: {
          ...(ageLimitationSelected.length > 0 && {
            ageLimitationId: ageLimitationSelected,
          }),
        },
        order: [["rating", "DESC"]],
        distinct: true,
        include: [
          {
            model: Genre,
            as: "genres",
            where: {
              ...(genresSelectedArr.length > 0 && { id: genresSelectedArr }),
            },
            through: {
              attributes: [],
            },
          },
          {
            model: Format,
            as: "formats",
            where: {
              ...(formatsSelectedArr.length > 0 && { id: formatsSelectedArr }),
            },
            through: {
              attributes: [],
            },
          },
        ],
        offset,
        limit,
      };

      if (sortSelected === "new") options.order = [["createdAt", "ASC"]];
      if (sortSelected === "duration") options.order = [["duration", "ASC"]];
      if (sortSelected === "rating") options.order = [["rating", "DESC"]];

      const films = await Film.findAndCountAll(options);

      return res.json(films);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async searchAll(req, res, next) {
    try {
      const { name } = req.query;

      const films = await Film.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          {
            model: Genre,
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.json(films);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const film = await Film.findOne({
        where: { id },
        include: [
          {
            model: Genre,
            as: "genres",
            through: {
              attributes: [],
            },
          },
          {
            model: Format,
            as: "formats",
            through: {
              attributes: [],
            },
          },
          {
            model: Session,
            include: [
              {
                model: Format,
              },
            ],
          },
          {
            model: AgeLimitation,
          },
        ],
      });

      return res.json(film);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new FilmController();
