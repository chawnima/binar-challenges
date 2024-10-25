const carsTypeService = require("../services/carsType");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getCarsType = async (req, res, next) => {
  const data = await carsTypeService.getCarsType(req);
  if (!data.length) {
    throw new NotFoundError(`Cars type not found`);
  }
  successResponse(res, data);
};

exports.getCarsTypeById = async (req, res, next) => {
  const data = await carsTypeService.getCarsTypeById(req.params.id);
  if (!data) {
    throw new NotFoundError(`Cars Type not found`);
  }
  successResponse(res, data);
};

exports.addCarsType = async (req, res, next) => {
  const data = await carsTypeService.addCarsType(req.body);
  successResponse(res, data);
};

exports.updateCarsType = async (req, res, next) => {
  const data = await carsTypeService.updateCarsType(
    req.params.id,
    req.body
  );
  if (!data) {
    throw new NotFoundError(`Type id not found`);
  }
  successResponse(res, data);
};

exports.deleteCarsType = (req, res, next) => {
  const data = carsTypeService.deleteCarsType(req.params.id);
  if (!data) {
    throw new NotFoundError(`Type id not found`);
  }
  successResponse(res, data);
};
