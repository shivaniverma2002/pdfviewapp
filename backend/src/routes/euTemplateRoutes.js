import express from "express";
import {
  createEUTemplate,
  getEUTemplates,
  getEUById,
  updateEUTemplate,
  deleteEUTemplate
} from "../controller/euTemplateController.js";

const router = express.Router();

router.post("/", createEUTemplate);
router.get("/", getEUTemplates);
router.get("/:id", getEUById);
router.put("/:id", updateEUTemplate);
router.delete("/:id", deleteEUTemplate);

export default router;
