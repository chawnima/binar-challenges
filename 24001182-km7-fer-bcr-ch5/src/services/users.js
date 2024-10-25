const usersRepositories = require("../repositories/users");
const { imageUpload } = require("../utils/image-kit");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.createUser = async (data, files) => {
  data.password = await bcrypt.hash(data.password, saltRounds);
  if (files?.profile_picture) {
    data.profile_picture = await imageUpload(files.profile_picture);
  }
  const newUser = await usersRepositories.createUser(data);
  delete newUser.password;

  return { newUser, token: usersRepositories.token(newUser.id) };
};

exports.userLogin = async (data) => {
  const userData = await usersRepositories.getUserByEmail(data.email);
  if (!userData) {
    return "No email found";
  }
  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    userData.password
  );
  if (!isPasswordCorrect) {
    return "Password incorrect";
  }
  return { token: usersRepositories.token(userData.id) };
};
