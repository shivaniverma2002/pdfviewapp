import express from "express";
import {
  createStandardTemplate,
  getAllStandardTemplates,
  getStandardTemplateById,
} from "../controller/standardTemplateController.js";

const router = express.Router();

router.post("/", createStandardTemplate);
router.get("/", getAllStandardTemplates);
router.get("/:id", getStandardTemplateById);

export default router;
