const carsService = require("../services/cars");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getCars = (req, res, next) => {
  const data = carsService.getCars(req);
  if (!data.length) {
    throw new NotFoundError(`Cars data not found`);
  }
  successResponse(res, data);
};

exports.getCarsById = (req, res, next) => {
  const data = carsService.getCarsById(req.params.id);
  if (!data) {
    throw new NotFoundError(`Cars not found`);
  }
  successResponse(res, data);
};

exports.addCars = async (req, res, next) => {
  const data = await carsService.addCars(req.parsedBody, req.files?.image);
  successResponse(res, data);
};

exports.updateCars = async (req, res, next) => {
  const data = await carsService.updateCars(
    req.params.id,
    req.parsedBody,
    req.files?.image
  );
  if (!data) {
    throw new NotFoundError(`Cars id not found`);
  }
  successResponse(res, data);
};

exports.deleteCars = (req, res, next) => {
  const data = carsService.deleteCars(req.params.id);
  if (!data) {
    throw new NotFoundError(`Cars id not found`);
  }
  successResponse(res, data);
};
