const ApiError = require('../errors/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const createJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) return next(ApiError.badRequest("Email or password not set"));

		const candidate = await User.findOne({ where: { email } });
		if (candidate) return next(ApiError.badRequest("User with this email exist"));

		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ email, role, password: hashPassword, name: email });
		const token = createJwt(user.id, user.email, user.role);

		return res.json({ token });
	}

  async login(req, res, next) {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) return next(ApiError.badRequest("User not found"));

		const comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) return next(ApiError.badRequest("Password incorrect"));

		const token = createJwt(user.id, user.email, user.role);

		return res.json({ token });
	}

  async check(req, res) {
		const token = createJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
	}
}

module.exports = new UserController();