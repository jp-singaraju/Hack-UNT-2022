const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Posts = require("../models/Posts");
const withAuth = require("../middleware/auth");

const postRouter = express.Router();

postRouter.get("/", withAuth, (req, res) => {
	Posts.find({}, (err, posts) => {
		res.status(200).json(posts);
	});
});

postRouter.get("/:id", withAuth, (req, res) => {
	const id = mongoose.Types.ObjectId(req.params.id.trim());

	Posts.findById({ _id: id }, (err, post) => {
		res.status(200).json(post);
	});
});

postRouter.get("/user/:uid", withAuth, (req, res) => {
	const uid = req.params.uid;

	Posts.find({ owner: uid }, (err, posts) => {
		res.status(200).json(posts);
	});
});

postRouter.post("/addPost", withAuth, function (req, res) {
	const email = req.email;
	const { title, description, img, type, link } = req.body;

	User.findOne({ email }, (err, user) => {
		const post = new Posts({
			owner: user,
			title,
			description,
			img,
			type,
			link,
		});
		post.save(function (err) {
			if (err) {
				console.error(err);
				res.status(500).send("Server error, try again");
			} else {
				User.updateOne({ email }, { points: user.points + 2 }).exec();
				res.status(200).send("New post");
			}
		});
	});
});

module.exports = postRouter;
module.exports = postRouter;
