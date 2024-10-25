const express = require("express");
const {
  validateGetParamsCarsType,
  validateGetQueryType,
  validatePostCarsType,
  validatePutCarsType,
} = require("../middlewares/type");
const {
  getCarsType,
  getCarsTypeById,
  addCarsType,
  updateCarsType,
  deleteCarsType,
} = require("../controllers/type");
const { validateToken } = require("../middlewares/auth");
const { ADMIN, USER } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(validateToken(ADMIN,USER), validateGetQueryType, getCarsType)
  .post(validateToken(ADMIN), validatePostCarsType, addCarsType);
router
  .route("/:id")
  .get(validateToken(ADMIN,USER), validateGetParamsCarsType, getCarsTypeById)
  .put(validateToken(ADMIN), validatePutCarsType, updateCarsType)
  .delete(
    validateToken(ADMIN),
    validateGetParamsCarsType,
    deleteCarsType
  );
module.exports = router;
