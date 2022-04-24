const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: { type: String, required: true },
	description: { type: String, required: true },
	img: { type: String },
	type: { type: String },
	link: { type: String },
});

module.exports = mongoose.model("Posts", PostsSchema);
