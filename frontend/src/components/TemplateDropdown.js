import React from "react";

const TemplateDropdown = ({ templates, onSelect }) => (
  <select onChange={(e) => onSelect(e.target.value)} className="border px-3 py-2 rounded">
    <option value="">Select Template</option>
    {templates.map((t) => (
      <option key={t._id} value={t._id}>
        {t.name || `Template ${t._id}`}
      </option>
    ))}
  </select>
);

export default TemplateDropdown;
