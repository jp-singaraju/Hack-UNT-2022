const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			console.error(err);
			res.status(500).json({
				error: "Internal error please try again",
			});
		} else if (!user) {
			res.status(401).json({
				error: "Incorrect email or password",
			});
		} else if (user.verifyPassword(password)) {
			const payload = { email };
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			res.cookie("token", token, { httpOnly: true }).sendStatus(200);
		} else {
			res.status(401).json({
				error: "Incorrect email or password",
			});
		}
	});
});

authRouter.post("/register", function (req, res) {
	const { email, password } = req.body;
	const user = new User({ email, password });
	user.save(function (err) {
		if (err) {
			console.error(err);
			res.status(500).send("Server error, try again");
		} else {
			res.status(200).send("New user registered");
		}
	});
});

authRouter.post("/logout", function (req, res) {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			console.error(err);
			res.status(500).json({
				error: "Internal error please try again",
			});
		} else if (!user) {
			res.status(401).json({
				error: "Incorrect email or password",
			});
		} else if (user.verifyPassword(password)) {
			res
				.cookie("token", "", { httpOnly: true, expires: new Date() })
				.sendStatus(200);
		} else {
			res.status(401).json({
				error: "Incorrect email or password",
			});
		}
	});
});

authRouter.get("/checkToken", auth, function (req, res) {
	res.sendStatus(200);
});

module.exports = authRouter;
