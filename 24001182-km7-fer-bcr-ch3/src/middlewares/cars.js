const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetParams = (req, res, next) => {
  const validateParams = z.string();
  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validatePostCars = (req, res, next) => {
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    //image:z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    //availableAt:z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.validatePutCars = (req, res, next) => {
  const validateParams = z.string();
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    //image:z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    //availableAt:z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });
  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};
