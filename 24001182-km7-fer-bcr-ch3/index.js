const express = require("express");
const { z } = require("zod");
const fs = require("fs");
const carsData = require("./cars.json");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

app.use(express.json());

//response(s)
class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}
const response = (res, status, data) => {
  res.status(status).json({
    success: true,
    data,
  });
};

//app
app.get("/", (req, res) => {
  res.status(200).json({ message: "ping successfully" });
});

//get all cars data
app.get("/cars", (req, res, next) => {
  response(res, 200, carsData);
});

//get data by id
app.get("/cars/:id", (req, res, next) => {
  const validateParams = z.string();
  const resultValidate = validateParams.safeParse(req.params.id);
  if (!resultValidate.success) {
    throw new BadRequestError(resultValidate.error.errors);
  }

  const dataById = carsData.find((data) => req.params.id == data.id);
  if (!dataById) {
    throw new BadRequestError("id not found");
  };
  response(res,200,dataById);
});

//add data
app.post("/cars", (req, res, next) => {
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    //image:z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    //availableAt:z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });
  const resultValidate = validateBody.safeParse(req.body);
  if (!resultValidate.success) {
    throw new BadRequestError(resultValidate.error.errors);
  }

  const newData = {
    id: uuidv4(),
    ...req.body,
  };
  carsData.push(newData);
  fs.writeFileSync("./cars.json", JSON.stringify(carsData, null, 2), "utf-8");

  response(res, 201, newData);
});

//update data
app.put("/cars/:id", (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    //image:z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    //availableAt:z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const findIdData = carsData.findIndex((car) => car.id == req.params.id);
  if (findIdData == -1) {
    throw new BadRequestError("id not found");
  }
  const carsId=carsData[findIdData].id;
  carsData[findIdData] = {id:carsId,...req.body};

  fs.writeFileSync("./cars.json", JSON.stringify(carsData, null, 2), "utf-8");
  response(res, 200, carsData[findIdData]);
});

//delete data
app.delete("/cars/:id", (req, res, next) => {
  const validateParams = z.string();
  const resultValidate = validateParams.safeParse(req.params.id);
  if (!resultValidate.success) {
    throw new BadRequestError(resultValidate.error.errors);
  }

  const findIdData = carsData.findIndex((car) => car.id == req.params.id);
  if (findIdData == -1) {
    throw new BadRequestError("id not found");
  }
  const deletedData=carsData[findIdData];
  carsData.splice(findIdData, 1);
  fs.writeFileSync("./cars.json", JSON.stringify(carsData, null, 2), "utf-8");
  response(res, 200, deletedData);
})

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errors = err.errors || [];
  const message = status != 500 ? err.message : "internal server error";
  res.status(status).json({
    success: false,
    data: null,
    errors,
    message,
  });
});

//port listener
app.listen(port, () => {
  console.log(`app listening into port ${port}`);
});
