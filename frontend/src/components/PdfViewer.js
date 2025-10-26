import React, { useState, useRef } from 'react';
import { apiService } from '../api/api';
import TemplateDropdown from './TemplateDropdown';

const PdfViewer = ({ templates, selectedTemplate, onTemplateSelect }) => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!selectedTemplate) return;
    
    try {
      setLoading(true);
      const blob = await apiService.downloadPDF(selectedTemplate._id, selectedTemplate.data.quoteNumber);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedTemplate.name}_${selectedTemplate.data.quoteNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (!selectedTemplate) return;

    try {
      setLoading(true);
      
      // Store original content
      const originalContents = document.body.innerHTML;
      
      // Get the PDF content
      const printContent = pdfRef.current.innerHTML;
      
      // Replace body with print-optimized content
      document.body.innerHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Quote - ${selectedTemplate.data.quoteNumber}</title>
            <style>
              @page {
                size: A4;
                margin: 15mm;
              }
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background: white;
                font-size: 12pt;
              }
              .a4-container {
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto;
                padding: 15mm;
                background: white;
                box-sizing: border-box;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 16px 0;
              }
              th, td {
                border: 1px solid #333;
                padding: 8px 12px;
                text-align: left;
              }
              th {
                background-color: #f8f9fa;
                font-weight: bold;
              }
              .text-right { text-align: right; }
              .text-center { text-align: center; }
              .font-bold { font-weight: bold; }
              .border-b { border-bottom: 1px solid #333; }
              .border-t { border-top: 1px solid #333; }
              img { max-width: 150px; height: auto; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `;
      
      // Print and restore
      window.print();
      
      // Restore original content
      setTimeout(() => {
        document.body.innerHTML = originalContents;
        window.location.reload();
      }, 100);
      
    } catch (error) {
      console.error('Error printing:', error);
      alert('Print failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PDFTemplate = ({ data }) => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
      }).format(amount);
    };

    const currentDate = new Date().toLocaleDateString('en-GB');

    return (
      <div className="bg-white shadow-lg mx-auto a4-container">
        {/* Header */}
        <header className="border-b-2 border-gray-300 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">QUOTE</h1>
              <h2 className="text-xl font-semibold text-gray-600">Quote #: {data.quoteNumber}</h2>
              <p className="text-sm text-gray-500 mt-1">Date: {currentDate}</p>
            </div>
            <div className="text-right">
              <div className="flex flex-col items-end">
                <img 
                  src="/logo.png" 
                  alt="Company Logo" 
                  className="h-24 w-24 object-contain mb-2"
                  onError={(e) => {
                    e.target.src = '/logo.png';
                  }}
                />
                <div className="text-xs text-gray-500">
                  <div>Ralakde Corporation</div>
                  <div>Professional Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border-r border-gray-200 pr-8">
            <h3 className="text-lg font-bold text-gray-700 mb-3">FROM</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">{data.companyInfo.name}</p>
              <p className="text-sm text-gray-600 mt-2">
                {data.companyInfo.address}<br />
                {data.companyInfo.city}<br />
                {data.companyInfo.country}<br />
                <span className="font-medium">Phone:</span> {data.companyInfo.phone}<br />
                <span className="font-medium">Email:</span> {data.companyInfo.email}<br />
                <span className="font-medium">Website:</span> {data.companyInfo.website}<br />
                <span className="font-medium">VAT:</span> {data.companyInfo.vat}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">BILL TO</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">{data.billTo.companyName}</p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Contact:</span> {data.billTo.contactName}<br />
                {data.billTo.address}<br />
                {data.billTo.city && `${data.billTo.city}`}
                {data.billTo.country}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4">ITEMS</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">#</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Item & Description</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Qty</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Rate</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="font-medium">{item.description}</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity} {item.unit || 'pcs'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatCurrency(item.rate)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                <h4 className="font-semibold text-gray-800">SUMMARY</h4>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sub Total:</span>
                  <span className="font-semibold">{formatCurrency(data.subtotal)}</span>
                </div>
                {data.taxAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tax:</span>
                    <span className="font-semibold">{formatCurrency(data.taxAmount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">TOTAL:</span>
                    <span className="text-lg font-bold">{formatCurrency(data.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
       

        {/* Terms & Conditions */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-3">TERMS & CONDITIONS</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm leading-relaxed">{data.terms}</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t-2 border-gray-300">
          <div className="text-center text-xs text-gray-500">
            <div className="flex justify-center items-center mb-2">
              <img 
                src="/logo.png" 
                alt="Company Logo" 
                className="h-12 w-12 mr-2"
              />
              <span>Ralakde Corporation • {data.companyInfo.website} • {data.companyInfo.phone}</span>
            </div>
            <p>Page 1 of 1 • Generated on {currentDate}</p>
            <p className="mt-1">Thank you for your business!</p>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="App Logo" 
                  className="h-14 w-14"
                />
                <h1 className="text-2xl font-bold text-gray-800">PDF Viewer</h1>
              </div>
              <TemplateDropdown
                templates={templates}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={onTemplateSelect}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              {loading && (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-600">Processing...</span>
                </div>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedTemplate || loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
                
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedTemplate || loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
          
          {selectedTemplate && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Selected Template:</span> {selectedTemplate.name} • 
                <span className="font-semibold ml-2">Quote #:</span> {selectedTemplate.data.quoteNumber}
              </p>
            </div>
          )}
        </div>

        {/* PDF Display */}
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {selectedTemplate ? (
              <div ref={pdfRef} className="pdf-container">
                <PDFTemplate data={selectedTemplate.data} />
              </div>
            ) : (
              <div className="w-[210mm] h-[297mm] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-24 w-24 mb-4 opacity-50"
                />
                <p className="text-xl text-gray-500 font-medium">Select a Template to View</p>
                <p className="text-gray-400 mt-2">Choose from the dropdown above to display your PDF</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;