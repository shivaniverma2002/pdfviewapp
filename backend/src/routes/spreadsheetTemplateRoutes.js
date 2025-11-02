import express from "express";
import {
  createSpreadsheetTemplate,
  getAllSpreadsheetTemplates,
  getSpreadsheetTemplateById,
  updateSpreadsheetTemplate,
  deleteSpreadsheetTemplate,
} from "../controller/spreadsheetTemplateController.js";

const router = express.Router();

// Create new Spreadsheet Template
router.post("/", createSpreadsheetTemplate);

// Get all Spreadsheet Templates
router.get("/", getAllSpreadsheetTemplates);

// Get a single Spreadsheet Template by ID
router.get("/:id", getSpreadsheetTemplateById);

// Update Spreadsheet Template
router.put("/:id", updateSpreadsheetTemplate);

// Delete (soft delete) Spreadsheet Template
router.delete("/:id", deleteSpreadsheetTemplate);

export default router;
