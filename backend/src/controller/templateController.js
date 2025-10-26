import Template from '../models/Template.js';
import PDFDocument from 'pdfkit';

// Get all templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true });
    res.json({
      success: true,
      data: templates,
      count: templates.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching templates',
      error: error.message
    });
  }
};

// Get template by ID
export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching template',
      error: error.message
    });
  }
};

// Create new template
export const createTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json({
      success: true,
      data: template,
      message: 'Template created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating template',
      error: error.message
    });
  }
};

// Update template
export const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    res.json({
      success: true,
      data: template,
      message: 'Template updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating template',
      error: error.message
    });
  }
};

// Delete template
export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting template',
      error: error.message
    });
  }
};

// Generate PDF for download
export const downloadPDF = async (req, res) => {
  try {
    const { templateId, quoteId } = req.params;
    
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Create PDF document
    const doc = new PDFDocument();
    const filename = `quote_${quoteId}.pdf`;
    
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(20).text('QUOTE', 50, 50);
    doc.fontSize(16).text(`Quote Number: ${template.data.quoteNumber}`, 50, 80);
    
    // Company Info
    doc.fontSize(12).text('Company Information:', 50, 120);
    doc.text(`Name: ${template.data.companyInfo.name}`, 50, 140);
    doc.text(`Address: ${template.data.companyInfo.address}`, 50, 160);
    doc.text(`Phone: ${template.data.companyInfo.phone}`, 50, 180);
    
    // Bill To
    doc.text('Bill To:', 50, 220);
    doc.text(`Company: ${template.data.billTo.companyName}`, 50, 240);
    doc.text(`Contact: ${template.data.billTo.contactName}`, 50, 260);
    
    // Items Table
    let yPosition = 300;
    doc.text('Items:', 50, yPosition);
    yPosition += 20;
    
    template.data.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.description}`, 50, yPosition);
      doc.text(`Qty: ${item.quantity}`, 250, yPosition);
      doc.text(`Rate: £${item.rate}`, 350, yPosition);
      doc.text(`Amount: £${item.amount}`, 450, yPosition);
      yPosition += 20;
    });
    
    // Totals
    yPosition += 20;
    doc.text(`Subtotal: £${template.data.subtotal}`, 350, yPosition);
    yPosition += 20;
    doc.text(`Total: £${template.data.total}`, 350, yPosition);
    
    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating PDF',
      error: error.message
    });
  }
};

// Generate PDF for print
export const generatePDF = async (req, res) => {
  try {
    const { templateId, quoteId } = req.params;
    
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    const doc = new PDFDocument();
    const filename = `quote_${quoteId}_print.pdf`;
    
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    
    doc.pipe(res);

    // content optimization
    doc.fontSize(18).text('QUOTE DOCUMENT', 50, 50);
    doc.fontSize(14).text(`Quote: ${template.data.quoteNumber}`, 50, 80);
    
    // Deatail for content
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, 110);
    
    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating print PDF',
      error: error.message
    });
  }
};