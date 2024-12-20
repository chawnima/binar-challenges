const carsRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");

exports.getCars = (req) => {
  return Object.keys(req.query).length ? carsRepository.getCarsByQuery(req.query?.plate,req.query?.manufacture) : carsRepository.getCars();
};

exports.getCarsById = (id) => {
  return carsRepository.getCarsById(id);
};

exports.addCars = async (data, files) => {
  if (files) {
    data.image = await imageUpload(files);
  }
  return carsRepository.addCars(data);
};

exports.updateCars = async (id, data, files) => {
  if (files) {
    data.image = await imageUpload(files);
  }
  return carsRepository.updateCars(id, data);
};

exports.deleteCars = (id) => {
  return carsRepository.deleteCars(id);
};
