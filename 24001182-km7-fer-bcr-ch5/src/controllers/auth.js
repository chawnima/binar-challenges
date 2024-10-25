const usersServices = require("../services/users");
const { successResponse } = require("../utils/response");
const { Unauthorized } = require("../utils/request");

exports.createUser = async (req, res, next) => {
  const newUser = await usersServices.createUser(req.body, req?.files);
  successResponse(res, newUser, (message = "Successfully created new user"));
};

exports.login = async (req, res, next) => {
  const userLogin = await usersServices.userLogin(req.body);
  if (typeof userLogin == "string") {
    throw new Unauthorized(userLogin);
  }
  successResponse(res, userLogin, (message = "Login successful"));
};

exports.userProfile = async (req, res, next) => {
  successResponse(res, req.userData, (message = "Profile found"));
};
