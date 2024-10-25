const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const JSONBigInt = require(`json-bigint`);

exports.getCarsType = async () => {
  const carsTypeData = await prisma.type.findMany();
  if (!carsTypeData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsTypeData);
  return JSONBigInt.parse(serializeData);
};

exports.getCarsTypeById = async (id) => {
  const carsTypeData = await prisma.type.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!carsTypeData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsTypeData);
  return JSONBigInt.parse(serializeData);
};

exports.getCarsTypeByQuery = async (name, characteristic, style) => {
  const carsTypeData = await prisma.type.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
            mode: "insensitive",
          },
          characteristic: {
            contains: characteristic,
            mode: "insensitive",
          },
          style: {
            contains: style,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  if (!carsTypeData) {
    return null;
  }
  const serializeData = JSONBigInt.stringify(carsTypeData);
  return JSONBigInt.parse(serializeData);
};

exports.addCarsType=async(data)=>{
  const newCarsType = await prisma.type.createManyAndReturn({
    data:[{...data}]
  });
  const serializeData = JSONBigInt.stringify(newCarsType);
  return JSONBigInt.parse(serializeData);
}