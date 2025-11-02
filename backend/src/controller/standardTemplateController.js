import StandardTemplate from "../models/StandardTemplate.js";

export const createStandardTemplate = async (req, res) => {
  try {
    const template = new StandardTemplate(req.body);
    await template.save();
    res.status(201).json({ success: true, data: template });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllStandardTemplates = async (req, res) => {
  try {
    const templates = await StandardTemplate.find({ isActive: true });
    res.json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStandardTemplateById = async (req, res) => {
  try {
    const template = await StandardTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ success: false, message: "Template not found" });
    res.json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
