const express = require("express");
const {
  validateGetParams,
  validatePostCars,
  validatePutCars,
  validateGetQuery
} = require("../middlewares/cars");
const {
  getCars,
  getCarsById,
  addCars,
  updateCars,
  deleteCars,
} = require("../controllers/cars");

const router = express.Router();

router.route("/").get(validateGetQuery, getCars).post(validatePostCars, addCars);

router
  .route("/:id")
  .get(validateGetParams, getCarsById)
  .put(validatePutCars, updateCars)
  .delete(validateGetParams, deleteCars);

module.exports = router;
