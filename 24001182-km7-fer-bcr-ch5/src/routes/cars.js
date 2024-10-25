const express = require("express");
const {
  validateGetParams,
  validatePostCars,
  validatePutCars,
  validateGetQuery,
} = require("../middlewares/cars");
const { validateToken } = require("../middlewares/auth");
const {ADMIN,USER}=require("../constants/auth")
const {
  getCars,
  getCarsById,
  addCars,
  updateCars,
  deleteCars,
} = require("../controllers/cars");

const router = express.Router();

router
  .route("/")
  .get(validateToken(ADMIN,USER), validateGetQuery, getCars)
  .post(validateToken(ADMIN), validatePostCars, addCars);
router
  .route("/:id")
  .get(validateToken(ADMIN,USER), validateGetParams, getCarsById)
  .put(validateToken(ADMIN), validatePutCars, updateCars)
  .delete(validateToken(ADMIN), validateGetParams, deleteCars);
module.exports = router;
