import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: String,
  details: String,
  quantity: Number,
  rate: Number,
  taxableAmount: Number,
  vatPercent: Number,
  vatAmount: Number,
  total: Number,
});

const vatSummarySchema = new mongoose.Schema({
  vatPercent: Number,
  vatTotal: Number,
});

const spreadsheetTemplateSchema = new mongoose.Schema({
  quoteNumber: String,
  quoteDate: String,
  expiryDate: String,
  reference: String,
  salesPerson: String,
  companyInfo: {
    name: String,
    address: String,
    vat: String,
    phone: String,
    email: String,
    website: String,
  },
  billTo: {
    companyName: String,
    address: String,
  },
  items: [itemSchema],
  subtotal: Number,
  vatTotal: Number,
  grandTotal: Number,
  vatSummary: [vatSummarySchema],
  notes: String,
  terms: String,
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("SpreadsheetTemplate", spreadsheetTemplateSchema);
