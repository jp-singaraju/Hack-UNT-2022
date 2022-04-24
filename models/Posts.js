const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	password: { type: String, required: true },
	points: { type: Number },
});

PostsSchema.verifyPassword = (password) => {
	return password === this.password;
};

module.exports = mongoose.model("Posts", PostsSchema);
