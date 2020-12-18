const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Fetching users Failed", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid data entry", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up Failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, Please Login instead",
      422
    );
    return next(error);
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Could not create user Please try again.", 500);
    return next(err);
  }

  const createUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashPassword,
    places: [],
  });

  try {
    await createUser.save();
  } catch (error) {
    return next(new HttpError("Create User Failed", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createUser.id, email: createUser.email },
      "super_secret_dont_share_or_use",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Create User Failed", 500));
  }

  res
    .status(201)
    .json({ userId: createUser.id, email: createUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging up Failed", 500);
    return next(error);
  }

  if (!existingUser) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new HttpError("incorrect Password, Please try again", 500);
    return next(err);
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "super_secret_dont_share_or_use",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Logging in Failed", 500));
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
