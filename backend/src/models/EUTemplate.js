import mongoose from "mongoose";

const EUTemplateSchema = new mongoose.Schema({
  quoteNumber: String,
  quoteDate: String,
  expiryDate: String,
  reference: String,
  salesPerson: String,
  vatNumber: String,

  companyInfo: {
    name: String,
    address: String,
    companyID: String,
    eori: String,
    vat: String,
    phoneUK: String,
    phoneEU: String,
    email: String,
    website: String,
  },

  billTo: {
    companyName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },

  subject: String,

  items: [
    {
      description: String,
      details: String,
      quantity: Number,
      unit: String,
      rate: Number,
      amount: Number,
    },
  ],

  subTotal: Number,
  discount: Number,
  total: Number,

  notes: String,
  terms: String,

  isActive: { type: Boolean, default: true },
});

const EUTemplate = mongoose.model("EUTemplate", EUTemplateSchema);
export default EUTemplate;
