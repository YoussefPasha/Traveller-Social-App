const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const DUMMY_USERS = [
  {
    id: "u1",
    name: "Youssef Pasha",
    email: "test@test.com",
    password: "21205787",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("Invalid data entry", 422));
  }
  const { name, email, password, places } = req.body;

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

  const createUser = new User({
    name,
    email,
    image:
      "https://avatars0.githubusercontent.com/u/45726395?s=400&u=d88a81c02b379929663b943aafb3be769bec9fc4&v=4",
    password,
    places,
  });

  try {
    await createUser.save();
  } catch (error) {
    return next(new HttpError("Create User Failed", 500));
  }
  res.status(201).json({ place: createUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    res.json({ msg: identifiedUser });
    return next(new HttpError("Could not identify User", 401));
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
