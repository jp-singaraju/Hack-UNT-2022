const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	points: { type: Number },
});

UserSchema.methods.verifyPassword = function (password) {
	return password === this.password;
};

module.exports = mongoose.model("User", UserSchema);
