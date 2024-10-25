const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JSONBigInt = require("json-bigint");
const jwt = require("jsonwebtoken");

exports.createUser = async (data) => {
  const newUser = await prisma.users.create({
    data,
  });

  const serializedData = JSONBigInt.stringify(newUser);
  return JSONBigInt.parse(serializedData);
};

exports.getUserById = async (id) => {
  const searchedUser = await prisma.users.findUnique({
    where: { id: id },
  });
  const serializedData = JSONBigInt.stringify(searchedUser);
  return JSONBigInt.parse(serializedData);
};

exports.getUserByEmail = async (email) => {
  const searchedUser = await prisma.users.findUnique({
    where: { email },
  });
  const serializedData = JSONBigInt.stringify(searchedUser);
  return JSONBigInt.parse(serializedData);
};

exports.token = (id) => {
  const payload = {
    user_id: id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "72h" });
};
