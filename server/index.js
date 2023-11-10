const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const protect = require("./middleware/authMiddleware");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to our chat app APIs");
});

app.use("/api/users", userRoute);
app.use("/api/chats", protect, chatRoute);
app.use("/api/messages", protect, messageRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true, // deprecated option
    useUnifiedTopology: true, // deprecated option
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
