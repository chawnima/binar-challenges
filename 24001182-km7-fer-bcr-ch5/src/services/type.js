const carsTypeRepository = require("../repositories/type");

exports.getCarsType = async (req) => {
  return await Object.keys(req.query).length ? carsTypeRepository.getCarsTypeByQuery(req.query?.name,req.query?.characteristic,req.query?.style) : carsTypeRepository.getCarsType();
};

exports.getCarsTypeById = async (id) => {
  return await carsTypeRepository.getCarsTypeById(id);
};

exports.addCarsType = async (data) => {
  return carsTypeRepository.addCarsType(data);
};

exports.updateCarsType = async (id, data) => {
  return carsTypeRepository.updateCarsType(id, data);
};

exports.deleteCarsType = async (id) => {
  return carsTypeRepository.deleteCarsType(id);
};
