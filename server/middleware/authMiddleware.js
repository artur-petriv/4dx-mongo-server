const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) res.status(401).json({ message: "User not authorized" });

		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.user = decoded;

		next();
	} catch (e) {
		res.status(403).json({ message: "Error! User not authorized" });
	}
}