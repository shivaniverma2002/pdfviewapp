import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  rate: Number,
  amount: Number,
  vatPercent: Number,
  vatAmount: Number
});

const standardTemplateSchema = new mongoose.Schema({
  quoteNumber: { type: String, required: true },
  quoteDate: String,
  validUntil: String,
  reference: String,
  salesPerson: String,
  companyInfo: {
    name: String,
    address: String,
    city: String,
    country: String,
    phone: String,
  },
  billTo: {
    companyName: String,
    address: String,
    contactName: String,
  },
  items: [itemSchema],
  subtotal: Number,
  vatSummary: [{
    vatPercent: Number,
    totalVat: Number
  }],
  total: Number,
  notes: String,
  terms: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("StandardTemplate", standardTemplateSchema);
