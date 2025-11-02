import EUTemplate from "../models/EUTemplate.js";

// CREATE
export const createEUTemplate = async (req, res) => {
  try {
    const template = new EUTemplate(req.body);
    await template.save();
    res.status(201).json({ success: true, data: template });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getEUTemplates = async (req, res) => {
  try {
    const templates = await EUTemplate.find({ isActive: true });
    res.json({ success: true, data: templates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET BY ID
export const getEUById = async (req, res) => {
  try {
    const template = await EUTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: template });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updateEUTemplate = async (req, res) => {
  try {
    const updated = await EUTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteEUTemplate = async (req, res) => {
  try {
    await EUTemplate.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: "Template deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
