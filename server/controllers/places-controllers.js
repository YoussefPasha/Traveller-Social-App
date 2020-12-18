const Mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const fs = require("fs");

const HttpError = require("../models/http-error");
const getCoordinatesForAddress = require("../utils/location");
const Place = require("../models/places");
const User = require("../models/user");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(
      new HttpError("Fetching places failed, please try again later", 500)
    );
  }
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid data entry", 422));
  }
  const { creator, title, description, address } = req.body;
  const coordinates = getCoordinatesForAddress(address);
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("Creating Place Failed, Please try again", 500));
  }

  if (!user) {
    return next(
      new HttpError("We could not find user for this provided id", 404)
    );
  }

  try {
    const sess = await Mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid data entry", 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update place.", 500)
    );
  }

  if (place.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this place.", 401));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. could not delete place.",
      500
    );
    return next(error);
  }

  if (!place) {
    return next(new HttpError("Could not find place for this id ", 404));
  }

  const imagePath = place.image;

  if (place.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed to edit this place.", 401));
  }

  try {
    const sess = await Mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. could not delete place.",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });
  res.status(200).json({ message: "Deleted Success" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
