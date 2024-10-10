const { z } = require("zod");
const { BadRequestError } = require("../utils/request");
const validateParams = z.string();
const validateBody = z.object({
  plate: z.string(),
  manufacture: z.string(),
  model: z.string(),
  rentPerDay: z.number(),
  capacity: z.number(),
  description: z.string(),
  availableAt: z.string(),
  transmission: z.string(),
  available: z.boolean(),
  type: z.string(),
  year: z.number(),
  options: z.array(z.string()),
  specs: z.array(z.string()),
});
const validatePicture = z
  .object({
    profilePicture: z
      .object({
        data: z.any(),
        name: z.string(),
      })
      .optional()
      .nullable(),
  })
  .optional()
  .nullable();

exports.validateGetParams = (req, res, next) => {
  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  next();
};

exports.validatePostCars = (req, res, next) => {
  const parsedBody = {
    ...req.body,
    available: req.body.available === "true",
    rentPerDay: Number(req.body.rentPerDay),
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    options:
      typeof req.body.options === "string"
        ? JSON.parse(req.body.options)
        : req.body.options,
    specs:
      typeof req.body.specs === "string"
        ? JSON.parse(req.body.specs)
        : req.body.specs,
  };
  const resultValidateBody = validateBody.safeParse(parsedBody);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultValidatePicture = validatePicture.safeParse(req.files);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }
  next();
};

exports.validatePutCars = (req, res, next) => {
  const parsedBody = {
    ...req.body,
    available: req.body.available === "true",
    rentPerDay: Number(req.body.rentPerDay),
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    options:
      typeof req.body.options === "string"
        ? JSON.parse(req.body.options)
        : req.body.options,
    specs:
      typeof req.body.specs === "string"
        ? JSON.parse(req.body.specs)
        : req.body.specs,
  };

  const resultValidateParams = validateParams.safeParse(req.params.id);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  const resultValidateBody = validateBody.safeParse(parsedBody);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  const resultValidatePicture = validatePicture.safeParse(req.files);
  if (!resultValidatePicture.success) {
    throw new BadRequestError(resultValidatePicture.error.errors);
  }
  next();
};
