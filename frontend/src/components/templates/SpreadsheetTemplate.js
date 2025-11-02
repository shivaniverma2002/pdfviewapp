// import React from "react";

// const SpreadsheetTemplate = ({ data }) => (
//   <div
//     className="bg-white text-gray-800 leading-tight  mx-auto"
//     style={{
//       width: "180mm",
//       height: "260mm", // Exact A4 height
//       padding: "12mm 14mm", // Standard print-safe margin
//       boxSizing: "border-box",
//       border: "1px solid #cbd5e1",
//       overflow: "hidden",
//       fontSize: "12px", // balanced readability
//     }}
//   >
//     {/* ===== HEADER SECTION ===== */}
//     <div className="flex justify-between items-start border-b border-gray-300 pb-3 mb-4">
//       {/* Left: Company Info + Logo */}
//       <div className="flex items-start gap-3">
//         <img
//           src="/logo.png"
//           alt="Logo"
//           className="h-14 w-auto object-contain mt-1"
//         />
//         <div>
//           <h1 className="font-bold text-base">{data.companyInfo?.name}</h1>
//           <p>{data.companyInfo?.address}</p>
//           <p>{data.companyInfo?.country}</p>
//           <p>VAT: {data.companyInfo?.vat}</p>
//           <p>{data.companyInfo?.phone}</p>
//           <p>{data.companyInfo?.email}</p>
//           <p>{data.companyInfo?.website}</p>
//         </div>
//       </div>

//       {/* Right: Quote Info */}
//       <div className="text-right">
//         <h2 className="text-xl font-bold text-gray-800 mb-1">QUOTE</h2>
//         <table className="text-sm ml-auto">
//           <tbody>
//             <tr><td className="pr-3 font-medium">Quote#</td><td>{data.quoteNumber}</td></tr>
//             <tr><td>Quote Date</td><td>{data.quoteDate}</td></tr>
//             <tr><td>Expiry Date</td><td>{data.expiryDate}</td></tr>
//             <tr><td>Reference#</td><td>{data.reference}</td></tr>
//             <tr><td>Sales Person</td><td>{data.salesPerson}</td></tr>
//           </tbody>
//         </table>
//       </div>
//     </div>

//     {/* ===== BILL TO ===== */}
//     <div className="mb-4 border-b border-gray-300 pb-2">
//       <h3 className="font-semibold underline mb-1">Bill To</h3>
//       <p>{data.billTo?.companyName}</p>
//       <p>{data.billTo?.address}</p>
//       <p>{data.billTo?.city}</p>
//       <p>{data.billTo?.country}</p>
//     </div>

//     {/* ===== ITEMS TABLE ===== */}
//     <table className="w-full border border-gray-400 border-collapse mb-4">
//       <thead className="bg-gray-100 text-gray-800 font-semibold">
//         <tr>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[4%]">#</th>
//           <th className="border border-gray-400 px-2 py-1 text-left w-[35%]">Item & Description</th>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[8%]">Qty</th>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[10%]">Rate</th>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[12%]">Taxable</th>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[8%]">VAT %</th>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[10%]">VAT Amt</th>
//           <th className="border border-gray-400 px-2 py-1 text-center w-[12%]">Total</th>
//         </tr>
//       </thead>

//       <tbody>
//         {data.items?.map((item, i) => (
//           <tr key={i} className="border border-gray-300">
//             <td className="border px-2 py-1 text-center">{i + 1}</td>
//             <td className="border px-2 py-1">
//               <div className="font-semibold">{item.description}</div>
//               {item.details && (
//                 <div className="text-gray-500 text-xs">{item.details}</div>
//               )}
//             </td>
//             <td className="border px-2 py-1 text-center">{item.quantity}</td>
//             <td className="border px-2 py-1 text-center">£{item.rate.toFixed(2)}</td>
//             <td className="border px-2 py-1 text-center">£{item.taxableAmount.toFixed(2)}</td>
//             <td className="border px-2 py-1 text-center">{item.vatPercent}%</td>
//             <td className="border px-2 py-1 text-center">£{item.vatAmount.toFixed(2)}</td>
//             <td className="border px-2 py-1 text-center font-semibold">£{item.total.toFixed(2)}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     {/* ===== TOTALS ===== */}
//     <div className="text-right mb-3">
//       <p>Sub Total: <span className="font-medium">£{data.subtotal?.toFixed(2)}</span></p>
//       <p>VAT Total: <span className="font-medium">£{data.vatTotal?.toFixed(2)}</span></p>
//       <p className="font-bold text-lg">Grand Total: £{data.grandTotal?.toFixed(2)}</p>
//     </div>

//     {/* ===== NOTES & TERMS ===== */}
//     <div className="text-sm border-t border-gray-300 pt-2">
//       <h3 className="font-semibold mb-1">Notes</h3>
//       <p>{data.notes || "Thank you for your business!"}</p>

//       <h3 className="font-semibold mt-2 mb-1">Terms & Conditions</h3>
//       <p>
//         {data.terms ||
//           "Payment is due within 30 days. Late payments may incur additional fees."}
//       </p>
//     </div>
//   </div>
// );

// export default SpreadsheetTemplate;

import React from "react";

const SpreadsheetTemplate = ({ data }) => {
  // Helper for safely formatting numbers
  const safeNumber = (num) =>
    typeof num === "number" && !isNaN(num) ? num.toFixed(2) : "0.00";

  return (
    <div
      className="bg-white text-gray-800 leading-tight mx-auto"
      style={{
        width: "180mm",
        minHeight: "260mm",
        padding: "15mm 18mm",
        boxSizing: "border-box",
      
        overflow: "hidden",
        fontSize: "12px",
      }}
    >
      {/* ===== HEADER SECTION ===== */}
      <div className="flex justify-between items-start border-b border-gray-300 pb-3 mb-4">
        {/* Left: Company Info + Logo */}
        <div className="flex items-start gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 w-auto object-contain mt-1"
          />
          <div>
            <h1 className="font-bold text-base">{data.companyInfo?.name || "Company Name"}</h1>
            <p>{data.companyInfo?.address || "Address"}</p>
            <p>{data.companyInfo?.country || ""}</p>
            <p>VAT: {data.companyInfo?.vat || "N/A"}</p>
            <p>{data.companyInfo?.phone || ""}</p>
            <p>{data.companyInfo?.email || ""}</p>
            <p>{data.companyInfo?.website || ""}</p>
          </div>
        </div>

        {/* Right: Quote Info */}
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-800 mb-1">QUOTE</h2>
          <table className="text-sm ml-auto">
            <tbody>
              <tr><td className="pr-3 font-medium">Quote#</td><td>{data.quoteNumber || "N/A"}</td></tr>
              <tr><td>Quote Date</td><td>{data.quoteDate || "N/A"}</td></tr>
              <tr><td>Expiry Date</td><td>{data.expiryDate || "N/A"}</td></tr>
              <tr><td>Reference#</td><td>{data.reference || "N/A"}</td></tr>
              <tr><td>Sales Person</td><td>{data.salesPerson || "N/A"}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== BILL TO ===== */}
      <div className="mb-4 border-b border-gray-300 pb-2">
        <h3 className="font-semibold underline mb-1">Bill To</h3>
        <p>{data.billTo?.companyName || "Client Company"}</p>
        <p>{data.billTo?.address || "Client Address"}</p>
        <p>{data.billTo?.city || ""}</p>
        <p>{data.billTo?.country || ""}</p>
      </div>

      {/* ===== ITEMS TABLE ===== */}
      <table className="w-full border border-gray-400 border-collapse mb-4 text-sm">
        <thead className="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-center w-[4%]">#</th>
            <th className="border border-gray-400 px-2 py-1 text-left w-[35%]">Item & Description</th>
            <th className="border border-gray-400 px-2 py-1 text-center w-[8%]">Qty</th>
            <th className="border border-gray-400 px-2 py-1 text-center w-[10%]">Rate</th>
            <th className="border border-gray-400 px-2 py-1 text-center w-[12%]">Taxable</th>
            <th className="border border-gray-400 px-2 py-1 text-center w-[8%]">VAT %</th>
            <th className="border border-gray-400 px-2 py-1 text-center w-[10%]">VAT Amt</th>
            <th className="border border-gray-400 px-2 py-1 text-center w-[12%]">Total</th>
          </tr>
        </thead>

        <tbody>
          {data.items?.length > 0 ? (
            data.items.map((item, i) => (
              <tr key={i} className="border border-gray-300 even:bg-gray-50">
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1">
                  <div className="font-semibold">{item.description || "Item"}</div>
                  {item.details && (
                    <div className="text-gray-500 text-xs">{item.details}</div>
                  )}
                </td>
                <td className="border px-2 py-1 text-center">{item.quantity || 0}</td>
                <td className="border px-2 py-1 text-center">£{safeNumber(item.rate)}</td>
                <td className="border px-2 py-1 text-center">£{safeNumber(item.taxableAmount)}</td>
                <td className="border px-2 py-1 text-center">{item.vatPercent || 0}%</td>
                <td className="border px-2 py-1 text-center">£{safeNumber(item.vatAmount)}</td>
                <td className="border px-2 py-1 text-center font-semibold">£{safeNumber(item.total)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-gray-500 py-3">
                No items available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== TOTALS ===== */}
      <div className="text-right mb-3">
        <p>Sub Total: <span className="font-medium">£{safeNumber(data.subtotal)}</span></p>
        <p>VAT Total: <span className="font-medium">£{safeNumber(data.vatTotal)}</span></p>
        <p className="font-bold text-lg">Grand Total: £{safeNumber(data.grandTotal)}</p>
      </div>

      {/* ===== NOTES & TERMS ===== */}
      <div className="text-sm border-t border-gray-300 pt-2">
        <h3 className="font-semibold mb-1">Notes</h3>
        <p>{data.notes || "Thank you for your business!"}</p>

        <h3 className="font-semibold mt-2 mb-1">Terms & Conditions</h3>
        <p>
          {data.terms ||
            "Payment is due within 30 days. Late payments may incur additional fees."}
        </p>
      </div>
    </div>
  );
};

export default SpreadsheetTemplate;

