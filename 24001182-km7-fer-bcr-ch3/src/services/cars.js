const carsRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");

exports.getCars = () => {
  return carsRepository.getCars();
};

exports.getCarsById = (id) => {
  return carsRepository.getCarsById(id);
};

exports.addCars = async (data, files) => {
  if (files) {
    data.profilePicture = await imageUpload(files);
  }
  return carsRepository.addCars(data);
};

exports.updateCars = async (id, data, files) => {
  if (files) {
    data.profilePicture = await imageUpload(files);
  }
  return carsRepository.updateCars(id, data);
};

exports.deleteCars = (id) => {
  return carsRepository.deleteCars(id);
};
