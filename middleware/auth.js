const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function (req, res, next) {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers["x-access-token"] ||
		req.cookies.token;

	if (!token) {
		res.status(401).send("Unauthorized: No token provided");
	} else {
		jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
			if (err) {
				res.status(401).send("Unauthorized: Invalid token");
			} else {
				req.email = decoded.email;
				next();
			}
		});
	}
};
