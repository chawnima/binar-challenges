const carsRepository = require("../repositories/cars");

exports.getCars = () => {
  return carsRepository.getCars();
}

exports.getCarsById = (id) => {
  return carsRepository.getCarsById(id);
}

exports.addCars=(data)=>{
  return carsRepository.addCars(data);
}

exports.updateCars=(id,data)=>{
  return carsRepository.updateCars(id,data);
}

exports.deleteCars=(id)=>{
  return carsRepository.deleteCars(id);
}