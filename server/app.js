const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

// normal middleware handle error requests on a server
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// special error handling middleware function
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      console.log(error);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://YoussefPasha:21205787@assd.xhmbd.mongodb.net/Social_Places?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
