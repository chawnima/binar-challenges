const express = require("express");
const {
  validateGetParams,
  validatePostCars,
  validatePutCars,
} = require("../middlewares/cars");
const {
  getCars,
  getCarsById,
  addCars,
  updateCars,
  deleteCars,
} = require("../controllers/cars");

const router = express.Router();

router.get("/", getCars);
router.get("/:id", validateGetParams, getCarsById);
router.post("/", validatePostCars, addCars);
router.put("/:id", validatePutCars, updateCars);
router.delete("/:id", validateGetParams, deleteCars);

module.exports = router;
