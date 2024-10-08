const cars = require("../../cars.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.getCars = () => {
  if (!cars) {
    return null;
  }
  return cars;
};

exports.getCarsById = (id) => {
  const carsById = cars.find((car) => car.id == id);
  if (!carsById) {
    return null;
  }
  return carsById;
};

exports.addCars = (data) => {
  const newCars = {
    id: uuidv4(),
    ...data,
  };
  cars.push(newCars);
  fs.writeFileSync("./cars.json", JSON.stringify(cars, null, 2), "utf-8");
  return newCars;
};

exports.updateCars = (id, data) => {
  const carsIndex = cars.findIndex((car) => car.id == id);
  if (carsIndex == -1) {
    return null;
  }
  const newCars = { id: id, ...data };
  cars[carsIndex] = newCars;
  fs.writeFileSync("./cars.json", JSON.stringify(cars, null, 2), "utf-8");
  return newCars;
};

exports.deleteCars = (id) => {
  const carsIndex = cars.findIndex((car) => car.id == id);
  const deletedCars = cars[carsIndex];
  if (carsIndex == -1) {
    return null;
  }
  cars.splice(carsIndex, 1);
  fs.writeFileSync("./cars.json", JSON.stringify(cars, null, 2), "utf-8");
  return deletedCars;
};
