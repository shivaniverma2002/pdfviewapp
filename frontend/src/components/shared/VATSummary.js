// import React from "react";
// const VATSummary = ({ vatSummary }) => (
//   <div className="mt-4">
//     <h4 className="font-semibold mb-2">VAT Summary</h4>
//     <table className="w-1/2 border">
//       <thead><tr><th>VAT %</th><th>Total VAT (£)</th></tr></thead>
//       <tbody>
//         {vatSummary.map((v, i) => (
//           <tr key={i}><td>{v.vatPercent}</td><td>{v.totalVat.toFixed(2)}</td></tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
// export default VATSummary;

import React from "react";

const VATSummary = ({ vatSummary }) => {
  if (!vatSummary || vatSummary.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2 underline">VAT Summary</h3>
      <table className="w-full border text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">VAT %</th>
            <th className="border px-2 py-1">VAT Total (£)</th>
          </tr>
        </thead>
        <tbody>
          {vatSummary.map((v, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{v.vatPercent}%</td>
              <td className="border px-2 py-1">£{v.vatTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VATSummary;
