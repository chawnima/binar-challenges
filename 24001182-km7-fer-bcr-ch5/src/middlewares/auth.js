const {
  BadRequestError,
  Unauthorized,
  Forbidden,
} = require("../utils/request");
const { z } = require("zod");
const { getUserByEmail, getUserById } = require("../repositories/users");
const jwt = require("jsonwebtoken");

exports.validateNewUser = async (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });
  const validatePicture = z
    .object({
      image: z
        .object({
          data: z.any(),
          name: z.string(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable();
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultValidatePicture = validatePicture.safeParse(req?.files);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }
  const isEmailUsed = await getUserByEmail(req.body.email);
  if (isEmailUsed) {
    throw new BadRequestError("Email already in use");
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const validateBody = z.object({
    email: z.string(),
    password: z.string(),
  });
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.validateToken =
  (...roles) =>
  async (req, res, next) => {
    if (!req.headers["authorization"]) {
      throw new Unauthorized("Token didn't found");
    }
    const getToken = req.headers["authorization"].split(" ");
    if (getToken.length < 2) {
      throw new Unauthorized("You need to login");
    }
    const token = getToken[1];
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = await getUserById(extractedToken.user_id);
    delete req.userData.password;

    const validateAccess = roles.includes(req.userData.role_id);
    if (!validateAccess) {
      throw new Forbidden("Access unauthorized!");
    }
    next();
  };
