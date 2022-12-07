const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, defaultValue: "User" },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false },
});

const Ticket = sequelize.define("ticket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false },
  place: { type: DataTypes.INTEGER, allowNull: false },
});

const HallRow = sequelize.define("hall_row", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  row: { type: DataTypes.STRING, unique: true },
  places: { type: DataTypes.INTEGER, allowNull: false },
});

const Session = sequelize.define("session", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

const OrderTicket = sequelize.define("order_ticket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Film = sequelize.define("film", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  year: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  language: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  trailer: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Genre = sequelize.define("genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  value: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Format = sequelize.define("format", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  value: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const FilmGenre = sequelize.define("film_genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const FilmFormat = sequelize.define("film_format", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const AgeLimitation = sequelize.define("age_limitation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Ticket, {
  through: OrderTicket,
  onDelete: "cascade",
});
Ticket.belongsToMany(Order, { through: OrderTicket, unique: true });

Film.belongsToMany(Genre, {
  through: FilmGenre,
  onDelete: "cascade",
});
Genre.belongsToMany(Film, { through: FilmGenre });

Film.belongsToMany(Format, {
  through: FilmFormat,
  onDelete: "cascade",
});
Format.belongsToMany(Film, { through: FilmFormat });

AgeLimitation.hasOne(Film);
Film.belongsTo(AgeLimitation);

Film.hasMany(Session);
Session.belongsTo(Film);

Format.hasOne(Session);
Session.belongsTo(Format);

Session.hasMany(Ticket);
Ticket.belongsTo(Session);

HallRow.hasMany(Ticket);
Ticket.belongsTo(HallRow);

module.exports = {
  User,
  Order,
  Ticket,
  HallRow,
  Session,
  Format,
  Film,
  Genre,
  AgeLimitation,
  FilmGenre,
  FilmFormat,
  OrderTicket,
};
