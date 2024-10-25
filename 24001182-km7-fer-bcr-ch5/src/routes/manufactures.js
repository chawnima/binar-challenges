const express = require("express");
const router = express.Router();
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
  validateDeleteManufactureById,
} = require("../middlewares/manufacturesValidation");
const manufacturesController = require("../controllers/manufactures");
const { validateToken } = require("../middlewares/auth");
const { ADMIN, USER } = require("../constants/auth");

// Route definitions
router
  .route("/")
  .get(
    validateToken(ADMIN,USER),
    validateGetManufactures,
    manufacturesController.getManufactures
  )
  .post(
    validateToken(ADMIN),
    validateCreateManufacture,
    manufacturesController.createManufacture
  );

router
  .route("/:id")
  .get(
    validateToken(ADMIN,USER),
    validateGetManufactureById,
    manufacturesController.getManufactureById
  )
  .put(
    validateToken(ADMIN),
    validateUpdateManufacture,
    manufacturesController.updateManufacture
  )
  .delete(
    validateToken(ADMIN),
    validateDeleteManufactureById,
    manufacturesController.deleteManufactureById
  );

module.exports = router;
