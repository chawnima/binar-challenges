const express = require("express");
const {
  validateGetParams,
  validatePostCars,
  validatePutCars,
  validateGetQuery,
} = require("../middlewares/cars");
const {
  getCars,
  getCarsById,
  addCars,
  updateCars,
  deleteCars,
} = require("../controllers/cars");
const {
  validateGetParamsCarsType,
  validateGetQueryType,
  validatePostCarsType,
  validatePutCarsType,
} = require("../middlewares/carsType");
const {
  getCarsType,
  getCarsTypeById,
  addCarsType,
  updateCarsType,
  deleteCarsType,
} = require("../controllers/carsType");

const router = express.Router();

router
  .route("/type")
  .get(validateGetQueryType, getCarsType)
  .post(validatePostCarsType, addCarsType);
router
  .route("/type/:id")
  .get(validateGetParamsCarsType, getCarsTypeById)
  .put(validatePutCarsType, updateCarsType)
  .delete(validateGetParamsCarsType, deleteCarsType);

router
  .route("/")
  .get(validateGetQuery, getCars)
  .post(validatePostCars, addCars);
router
  .route("/:id")
  .get(validateGetParams, getCarsById)
  .put(validatePutCars, updateCars)
  .delete(validateGetParams, deleteCars);
module.exports = router;

