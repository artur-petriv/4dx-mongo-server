const { Ticket, HallRow } = require("../models/models");
const ApiError = require("../errors/ApiError");

class TicketController {
  async create(req, res, next) {
    try {
      const { placesSelected, sessionId } = req.body;
      const newData = placesSelected.map((place) => {
        return { ...place, sessionId, status: "sold" };
      });

      const result = await Ticket.bulkCreate(newData);

      return res.json(result);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { sessionId } = req.query;
      const result = await Ticket.findAll({
        where: { sessionId },
        include: [{ model: HallRow }],
      });

      return res.json(result);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new TicketController();
