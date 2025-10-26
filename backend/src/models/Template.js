import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'pcs'
  }
});

const companyInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  vat: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  }
});

const billToSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    required: true
  }
});

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['standard', 'eu', 'spreadsheet'],
    required: true
  },
  data: {
    quoteNumber: {
      type: String,
      required: true
    },
    companyInfo: companyInfoSchema,
    billTo: billToSchema,
    items: [itemSchema],
    subtotal: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      default: ''
    },
    terms: {
      type: String,
      default: ''
    },
    validUntil: {
      type: String,
      default: '30 days'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Template = mongoose.model('Template', templateSchema);

export default Template;