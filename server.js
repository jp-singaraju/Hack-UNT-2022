require("dotenv").config();

var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

var User = require("./models/User");
var Posts = require("./models/Posts");

const authRouter = require("./routers/auth");
const postRouter = require("./routers/posts");

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
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(process.env.port || 4000, function () {
	console.log(`Spaceverse server listening at ${process.env.port || 4000}`);
});
