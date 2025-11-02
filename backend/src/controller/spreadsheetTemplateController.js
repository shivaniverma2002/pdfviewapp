// import SpreadsheetTemplate from "../models/SpreadsheetTemplate.js";

// /**
//  * @desc Create a new Spreadsheet Template
//  * @route POST /api/templates/spreadsheet
//  */
// export const createSpreadsheetTemplate = async (req, res) => {
//   try {
//     const template = new SpreadsheetTemplate(req.body);
//     await template.save();
//     res.status(201).json({ success: true, data: template, message: "Spreadsheet template created successfully" });
//   } catch (err) {
//     res.status(400).json({ success: false, message: "Error creating spreadsheet template", error: err.message });
//   }
// };

// /**
//  * @desc Get all active Spreadsheet Templates
//  * @route GET /api/templates/spreadsheet
//  */
// export const getAllSpreadsheetTemplates = async (req, res) => {
//   try {
//     const templates = await SpreadsheetTemplate.find({ isActive: true });
//     res.json({ success: true, data: templates });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error fetching spreadsheet templates", error: err.message });
//   }
// };

// /**
//  * @desc Get a single Spreadsheet Template by ID
//  * @route GET /api/templates/spreadsheet/:id
//  */
// export const getSpreadsheetTemplateById = async (req, res) => {
//   try {
//     const template = await SpreadsheetTemplate.findById(req.params.id);
//     if (!template) {
//       return res.status(404).json({ success: false, message: "Spreadsheet template not found" });
//     }
//     res.json({ success: true, data: template });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error fetching spreadsheet template", error: err.message });
//   }
// };

// /**
//  * @desc Update a Spreadsheet Template
//  * @route PUT /api/templates/spreadsheet/:id
//  */
// export const updateSpreadsheetTemplate = async (req, res) => {
//   try {
//     const updatedTemplate = await SpreadsheetTemplate.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedTemplate) {
//       return res.status(404).json({ success: false, message: "Spreadsheet template not found" });
//     }
//     res.json({ success: true, data: updatedTemplate, message: "Spreadsheet template updated successfully" });
//   } catch (err) {
//     res.status(400).json({ success: false, message: "Error updating spreadsheet template", error: err.message });
//   }
// };

// /**
//  * @desc Delete a Spreadsheet Template (Soft Delete)
//  * @route DELETE /api/templates/spreadsheet/:id
//  */
// export const deleteSpreadsheetTemplate = async (req, res) => {
//   try {
//     const deletedTemplate = await SpreadsheetTemplate.findByIdAndUpdate(
//       req.params.id,
//       { isActive: false },
//       { new: true }
//     );
//     if (!deletedTemplate) {
//       return res.status(404).json({ success: false, message: "Spreadsheet template not found" });
//     }
//     res.json({ success: true, message: "Spreadsheet template deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error deleting spreadsheet template", error: err.message });
//   }
// };

import SpreadsheetTemplate from "../models/SpreadsheetTemplate.js";

/**
 * @desc Create a new Spreadsheet Template with auto VAT Summary, Totals, Notes, and Terms
 * @route POST /api/templates/spreadsheet
 */
export const createSpreadsheetTemplate = async (req, res) => {
  try {
    const data = req.body;

    // Auto calculate VAT summary
    const vatMap = {};
    let subtotal = 0;
    data.items?.forEach((item) => {
      subtotal += item.taxableAmount || 0;
      if (item.vatPercent) {
        vatMap[item.vatPercent] =
          (vatMap[item.vatPercent] || 0) +
          ((item.taxableAmount || 0) * item.vatPercent) / 100;
      }
    });

    const vatSummary = Object.entries(vatMap).map(([vatPercent, vatTotal]) => ({
      vatPercent: Number(vatPercent),
      vatTotal: Number(vatTotal.toFixed(2)),
    }));

    const vatTotal = Object.values(vatMap).reduce((a, b) => a + b, 0);
    const grandTotal = subtotal + vatTotal;

    const template = new SpreadsheetTemplate({
      ...data,
      vatSummary,
      subtotal,
      vatTotal,
      grandTotal,
      notes:
        data.notes ||
        "Thank you for your business! This quote is valid for 30 days unless otherwise stated.",
      terms:
        data.terms ||
        "All payments are due within 30 days. Errors and omissions are excepted. Standard company terms apply.",
    });

    await template.save();
    res.status(201).json({
      success: true,
      message: "Spreadsheet template created successfully",
      data: template,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error creating spreadsheet template",
      error: err.message,
    });
  }
};

/**
 * @desc Get all active Spreadsheet Templates
 * @route GET /api/templates/spreadsheet
 */
export const getAllSpreadsheetTemplates = async (req, res) => {
  try {
    const templates = await SpreadsheetTemplate.find({ isActive: true });
    res.json({ success: true, data: templates });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching spreadsheet templates",
      error: err.message,
    });
  }
};

/**
 * @desc Get a single Spreadsheet Template by ID
 * @route GET /api/templates/spreadsheet/:id
 */
export const getSpreadsheetTemplateById = async (req, res) => {
  try {
    const template = await SpreadsheetTemplate.findById(req.params.id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Spreadsheet template not found",
      });
    }
    res.json({ success: true, data: template });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching spreadsheet template",
      error: err.message,
    });
  }
};

/**
 * @desc Update a Spreadsheet Template
 * @route PUT /api/templates/spreadsheet/:id
 */
export const updateSpreadsheetTemplate = async (req, res) => {
  try {
    const updatedTemplate = await SpreadsheetTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Spreadsheet template not found",
      });
    }

    res.json({
      success: true,
      message: "Spreadsheet template updated successfully",
      data: updatedTemplate,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error updating spreadsheet template",
      error: err.message,
    });
  }
};

/**
 * @desc Delete a Spreadsheet Template (Soft Delete)
 * @route DELETE /api/templates/spreadsheet/:id
 */
export const deleteSpreadsheetTemplate = async (req, res) => {
  try {
    const deletedTemplate = await SpreadsheetTemplate.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!deletedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Spreadsheet template not found",
      });
    }

    res.json({
      success: true,
      message: "Spreadsheet template deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting spreadsheet template",
      error: err.message,
    });
  }
};

