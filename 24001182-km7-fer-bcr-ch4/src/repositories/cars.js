const cars = require("../../data/cars.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const dataPath = "./data/cars.json";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const JSONBigInt = require(`json-bigint`);

exports.getCars = async () => {
  const carsData = await prisma.cars.findMany();
  if (!carsData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsData);
  return JSONBigInt.parse(serializeData);
};

exports.getCarsByQuery = async (plate, manufacture) => {
  const searchedCars = await prisma.cars.findMany({
    where:{
      OR:[{
        plate:{
          contains:plate, mode:"insensitive"
        },
        manufacture:{
          contains:manufacture, mode:"insensitive"
        }
      }]
    }
  })
  if (!searchedCars) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializeData);
};

exports.getCarsById = async (id) => {
  const carsById = await prisma.cars.findUnique({
    where: {
      id: id,
    },
  });
  if (!carsById) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsById);
  return JSONBigInt.parse(serializeData);
};

exports.addCars = async (data) => {
  const newCars = await prisma.cars.create({
    data
  });
  const serializeData = JSONBigInt.stringify(newCars);
  return JSONBigInt.parse(serializeData);
};

exports.updateCars = (id, data) => {
  const carsIndex = cars.findIndex((car) => car.id == id);
  if (carsIndex == -1) {
    return null;
  }
  const newCars = {
    id: id,
    ...cars[carsIndex],
    ...data,
  };
  cars[carsIndex] = newCars;
  fs.writeFileSync(dataPath, JSON.stringify(cars, null, 2), "utf-8");
  return newCars;
};

exports.deleteCars = (id) => {
  const carsIndex = cars.findIndex((car) => car.id == id);
  const deletedCars = cars[carsIndex];
  if (carsIndex == -1) {
    return null;
  }
  cars.splice(carsIndex, 1);
  fs.writeFileSync(dataPath, JSON.stringify(cars, null, 2), "utf-8");
  return deletedCars;
};
