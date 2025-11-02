import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js"; // ✅ Import this
import apiService from "../api/api";
import StandardTemplate from "./templates/StandardTemplate";
import EUQuoteTemplate from "./templates/EUQuoteTemplate";
import SpreadsheetTemplate from "./templates/SpreadsheetTemplate";

const PdfViewer = () => {
  const [type, setType] = useState("standard");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const previewRef = useRef();

  // Load template automatically when type changes
  useEffect(() => {
    loadTemplates(type);
  }, [type]);

  const loadTemplates = async (t) => {
    try {
      let res;
      if (t === "standard") res = await apiService.getStandardTemplates();
      else if (t === "eu") res = await apiService.getEUTemplates();
      else if (t === "spreadsheet") res = await apiService.getSpreadsheetTemplates();

      // Auto-load first template if available
      if (res?.data?.length > 0) {
        const firstTemplate = res.data[0];

        let fullTemplate;
        if (t === "standard")
          fullTemplate = await apiService.getStandardById(firstTemplate._id);
        else if (t === "eu")
          fullTemplate = await apiService.getEUById(firstTemplate._id);
        else if (t === "spreadsheet")
          fullTemplate = await apiService.getSpreadsheetById(firstTemplate._id);

        setSelectedTemplate(fullTemplate.data);
      } else {
        setSelectedTemplate(null);
      }
    } catch (err) {
      console.error("Error loading templates:", err);
    }
  };

  // 🖨️ PRINT FUNCTION
  const handlePrint = () => {
    if (!previewRef.current) return alert("No template to print!");

    const printWindow = window.open("", "_blank", "width=900,height=1000");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print PDF</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 20mm; background: white; font-family: Arial, sans-serif; }
            .a4-container { width: 290mm; min-height: 297mm; margin: auto; }
          </style>
        </head>
        <body>${previewRef.current.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // ⬇️ DOWNLOAD FUNCTION using html2pdf.js
  const handleDownload = () => {
    if (!previewRef.current) return alert("No template to download!");

    const element = previewRef.current;
    const opt = {
      margin: 0,
      filename: `${type}_template.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderTemplate = () => {
    if (!selectedTemplate)
      return (
        <div className="text-gray-400 text-center py-10">
          No templates found for this type
        </div>
      );

    switch (type) {
      case "standard":
        return <StandardTemplate data={selectedTemplate} />;
      case "eu":
        return <EUQuoteTemplate data={selectedTemplate} />;
      case "spreadsheet":
        return <SpreadsheetTemplate data={selectedTemplate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white p-4 rounded flex justify-between items-center shadow">
          <div className="flex gap-4 items-center">
            <img src="/logo.png" alt="logo" className="h-10" />
            <select
              onChange={(e) => setType(e.target.value)}
              className="border px-3 py-2 rounded"
              value={type}
            >
               <option value="select">Select Template</option>
              <option value="standard">Standard Template</option>
              <option value="eu">EU Quote Template</option>
              <option value="spreadsheet">Spreadsheet Template</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={!selectedTemplate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              disabled={!selectedTemplate}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Print PDF
            </button>
          </div>
        </div>

        {/* Template Preview */}
        <div ref={previewRef} className="a4-container mt-6 shadow bg-white">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
