const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordinatesForAddress = require("../utils/location");
const Place = require("../models/places");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    throw new HttpError("Fetching places failed, please try again later", 500);
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
    throw new HttpError("Invalid data entry", 422);
  }
  const { creator, title, description, address } = req.body;
  const coordinates = getCoordinatesForAddress(address);
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://images.squarespace-cdn.com/content/v1/53170656e4b04f773bf88c62/1582219584487-3OAPNCAZBQ3FVXGZ6BK9/ke17ZwdGBToddI8pDm48kJ7b_czD8K-GlrMxD5SCZRIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcHb4Mgx5VOko7O0Fa25dY_3m0NvURTqMSdutKBeg48siOabULyivEAjpE6UPV3N36/invite-to-paradise-maldives-holiday-honeymoon-packages+2.jpg",
    creator,
  });
  try {
    await createdPlace.save();
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid data entry", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError(error.message, 500));
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
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. could not delete place.",
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Success" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;