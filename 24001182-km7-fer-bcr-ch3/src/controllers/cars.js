const carsService = require("../services/cars");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getCars = (req, res, next) => {
  const data = carsService.getCars();
  if (!data) {
    throw new NotFoundError(`Cars data not found`);
  }
  successResponse(res, data);
};

exports.getCarsById = (req, res, next) => {
  const data = carsService.getCarsById(req.params.id);
  if (!data) {
    throw new NotFoundError(`Students not found`);
  }
  successResponse(res, data);
};

exports.addCars = (req, res, next) => {
  const data = carsService.addCars(req.body);
  successResponse(res, data);
};

exports.updateCars = (req, res, next) => {
  const data = carsService.updateCars(req.params.id, req.body);
  if (!data) {
    throw new NotFoundError(`Students id not found`);
  }
  successResponse(res, data);
};

exports.deleteCars = (req, res, next) => {
  const data = carsService.deleteCars(req.params.id);
  if (!data) {
    throw new NotFoundError(`Students id not found`);
  }
  successResponse(res, data);
};
