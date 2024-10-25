const express = require("express");
const {
  validateGetModels,
  validateGetModelById,
  validateDeleteModelById,
  validateCreateModel,
  validateUpdateModel,
} = require("../middlewares/models");
const {
  getModels,
  getModelById,
  deleteModelById,
  createModel,
  updateModel,
} = require("../controllers/models");
const { validateToken } = require("../middlewares/auth");
const { ADMIN, USER } = require("../constants/auth");

const router = express.Router();

router.get("/", validateToken(ADMIN,USER), validateGetModels, getModels);
router.post("/", validateToken(ADMIN), validateCreateModel, createModel);
router.get("/:id", validateToken(ADMIN,USER), validateGetModelById, getModelById);
router.put(
  "/:id",
  validateToken(ADMIN),
  validateUpdateModel,
  updateModel
);
router.delete(
  "/:id",
  validateToken(ADMIN),
  validateDeleteModelById,
  deleteModelById
);

module.exports = router;
