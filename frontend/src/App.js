import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import PdfViewer from './components/PdfViewer';
import { apiService } from './api/api';

function App() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seedSampleData = useCallback(async () => {
    try {
      const response = await apiService.seedData();
      if (response.success) {
        setTemplates(response.data);
        setSelectedTemplate(response.data[0]);
      }
    } catch (err) {
      console.error('Error seeding data:', err);
      setError('Failed to load sample data. Please check the backend connection.');
    }
  }, []);

  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getTemplates();
      
      if (response.success && response.data.length > 0) {
        setTemplates(response.data);
        setSelectedTemplate(response.data[0]);
      } else {
        await seedSampleData();
      }
    } catch (err) {
      console.error('Error loading templates:', err);
      setError('Failed to load templates. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  }, [seedSampleData]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-600 text-lg font-semibold mb-4">Error</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-600 mb-4">
            Make sure the backend server is running on http://localhost:5000
          </p>
          <button
            onClick={loadTemplates}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <PdfViewer
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
}

export default App;