import express from 'express';
import {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  downloadPDF,
  generatePDF
} from '../controller/templateController.js';

const router = express.Router();

// Template routes
router.get('/', getTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

// PDF routes
router.get('/pdf/download/:templateId/:quoteId', downloadPDF);
router.get('/pdf/generate/:templateId/:quoteId', generatePDF);

export default router;