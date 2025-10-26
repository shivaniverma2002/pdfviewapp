import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import templateRoutes from './routes/templateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/templates', templateRoutes);
app.get("/", (req, res) => {
  res.json({ success: "ok" });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'PDF Viewer API is running', 
    timestamp: new Date().toISOString() 
  });
});

// Seed initial data
app.post('/api/seed', async (req, res) => {
  try {
    const Template = (await import('./models/Template.js')).default;
    
    // Clear existing templates
    await Template.deleteMany({});
    
    // Insert sample templates
    const sampleTemplates = [
      {
        name: 'Standard Template',
        type: 'standard',
        data: {
          quoteNumber: 'QT-17940',
          companyInfo: {
            name: 'Ralakde',
            address: 'Unus 24 Victoria Road',
            city: 'Slade On Trent: Saintozabine SPL 2HS',
            country: 'United Kingdom',
            phone: '+41 (0) 2223 2377',
            email: 'sales@ralakde.com',
            website: 'www.ralakde.com',
            vat: 'G8246003893'
          },
          billTo: {
            companyName: 'text company2',
            contactName: 'stiguri',
            address: '999999 West Bengal',
            city: '',
            country: 'India'
          },
          items: [
            {
              description: 'Test Item Coke2',
              quantity: 1,
              rate: 100.00,
              amount: 100.00
            }
          ],
          subtotal: 100.00,
          total: 100.00,
          notes: 'Thanks in advance for your business.',
          terms: 'The buyer is responsible for lease, freight, and customs duties when applicable.',
          validUntil: '30 days'
        }
      },
      {
        name: 'EU Template',
        type: 'eu',
        data: {
          quoteNumber: 'QT-17941',
          companyInfo: {
            name: 'Ralakde EU',
            address: '25 Business Avenue',
            city: 'London',
            country: 'United Kingdom',
            phone: '+44 (0) 20 7946 0958',
            email: 'eu-sales@ralakde.com',
            website: 'www.ralakde-eu.com',
            vat: 'EU123456789'
          },
          billTo: {
            companyName: 'European Partner GmbH',
            contactName: 'Hans Mueller',
            address: '123 Business Strasse',
            city: 'Berlin',
            country: 'Germany'
          },
          items: [
            {
              description: 'Professional Services',
              quantity: 5,
              rate: 150.00,
              amount: 750.00
            },
            {
              description: 'Technical Support',
              quantity: 10,
              rate: 75.00,
              amount: 750.00
            }
          ],
          subtotal: 1500.00,
          total: 1500.00,
          notes: 'Thank you for your business. Prices include VAT where applicable.',
          terms: 'EU standard terms and conditions apply. Delivery within 14 business days.',
          validUntil: '45 days'
        }
      },
      {
        name: 'Spreadsheet Template',
        type: 'spreadsheet',
        data: {
          quoteNumber: 'QT-17942',
          companyInfo: {
            name: 'Ralakde Analytics',
            address: '30 Data Street',
            city: 'Manchester',
            country: 'United Kingdom',
            phone: '+44 (0) 161 999 8888',
            email: 'analytics@ralakde.com',
            website: 'www.ralakde-analytics.com',
            vat: 'GB987654321'
          },
          billTo: {
            companyName: 'Data Solutions Inc',
            contactName: 'Sarah Johnson',
            address: '456 Tech Park',
            city: 'Reading',
            country: 'United Kingdom'
          },
          items: [
            {
              description: 'Data Analysis Service',
              quantity: 3,
              rate: 200.00,
              amount: 600.00
            },
            {
              description: 'Report Generation',
              quantity: 2,
              rate: 100.00,
              amount: 200.00
            },
            {
              description: 'Consultation Hours',
              quantity: 8,
              rate: 125.00,
              amount: 1000.00
            }
          ],
          subtotal: 1800.00,
          taxAmount: 360.00,
          total: 2160.00,
          notes: 'Detailed breakdown available upon request.',
          terms: 'All services subject to our standard consulting agreement.',
          validUntil: '60 days'
        }
      }
    ];
    
    const createdTemplates = await Template.insertMany(sampleTemplates);
    
    res.json({
      success: true,
      message: 'Sample data seeded successfully',
      data: createdTemplates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding data',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler - FIXED: Use a proper path instead of '*'
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Seed data: http://localhost:${PORT}/api/seed (POST)`);
  console.log(`Get templates: http://localhost:${PORT}/api/templates`);
});