require("dotenv").config();

var express = require("express");
const cors = require("cors");
var mongoose = require("mongoose");

var User = require("./models/User");
var Posts = require("./models/Posts");

const authRouter = require("./routers/auth");

mongoose.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (err) {
		if (err) {
			throw err;
		} else {
			console.log("MongoDB connected");
		}
	}
);

var app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.listen(process.env.port || 4000, function () {
	console.log(`Spaceverse server listening at ${process.env.port || 4000}`);
});
