import React from "react";

const StandardTemplate = ({ data }) => {
  // Helper to safely format numbers
  const safeNumber = (num) =>
    typeof num === "number" && !isNaN(num) ? num.toFixed(2) : "0.00";

  return (
    <div
      className="text-[13px] text-gray-800 leading-snug  bg-white mx-auto "
      style={{
        width: "180mm",
        minHeight: "260mm",
        padding: "12mm 15mm",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-2 mb-3">
        <div>
          <img src="/logo.png" alt="Company Logo" className="h-12 mb-2" />
          <p>{data.companyInfo?.address || ""}</p>
          <p>{data.companyInfo?.phone || ""}</p>
          <p>{data.companyInfo?.email || ""}</p>
          <p>{data.companyInfo?.website || ""}</p>
          <p>VAT: {data.companyInfo?.vatNo || ""}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-green-700">QUOTE</h2>
          <p>Quote#: {data.quoteNumber || "N/A"}</p>
          <p>Quote Date: {data.quoteDate || "N/A"}</p>
          <p>Expiry Date: {data.expiryDate || "N/A"}</p>
          <p>Reference#: {data.reference || "N/A"}</p>
          <p>Sales Person: {data.salesPerson || "N/A"}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-3">
        <h3 className="font-semibold underline">Bill To</h3>
        <p>{data.billTo?.companyName || "Client Name"}</p>
        <p>{data.billTo?.address || "Client Address"}</p>
      </div>

      {/* Items Table */}
      <table className="w-full border text-left border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Item & Description</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Rate</th>
            <th className="border px-2 py-1">Discount</th>
            <th className="border px-2 py-1">VAT %</th>
            <th className="border px-2 py-1">VAT Amt</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items?.length > 0 ? (
            data.items.map((item, i) => (
              <tr key={i}>
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1">
                  <div className="font-semibold">{item.description || "N/A"}</div>
                  <div className="text-xs text-gray-500">
                    {item.details || ""}
                  </div>
                </td>
                <td className="border px-2 py-1 text-right">
                  {item.quantity || 0}
                </td>
                <td className="border px-2 py-1 text-right">
                  £{safeNumber(item.rate)}
                </td>
                <td className="border px-2 py-1 text-right">
                  £{safeNumber(item.discount)}
                </td>
                <td className="border px-2 py-1 text-right">
                  {item.vatPercent || 0}%
                </td>
                <td className="border px-2 py-1 text-right">
                  £{safeNumber(item.vatAmount)}
                </td>
                <td className="border px-2 py-1 text-right">
                  £{safeNumber(item.total)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-gray-500 py-4">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* VAT Summary */}
      <div className="mt-4">
        <h3 className="font-semibold">VAT Summary</h3>
        <table className="w-full border text-sm border-collapse mt-1">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">VAT Details</th>
              <th className="border px-2 py-1">Taxable Amount</th>
              <th className="border px-2 py-1">VAT Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.vatSummary?.length > 0 ? (
              data.vatSummary.map((v, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{v.label || "N/A"}</td>
                  <td className="border px-2 py-1 text-right">
                    £{safeNumber(v.taxableAmount)}
                  </td>
                  <td className="border px-2 py-1 text-right">
                    £{safeNumber(v.vatAmount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-3">
                  No VAT summary available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="text-right mt-4">
        <p>Sub Total: £{safeNumber(data.subtotal)}</p>
        <p>Discount: £{safeNumber(data.discount)}</p>
        <p className="font-bold text-lg">Total: £{safeNumber(data.total)}</p>
      </div>

      {/* Notes & Terms */}
      <div className="mt-5 text-sm">
        <h3 className="font-semibold">Notes</h3>
        <p>{data.notes || "Thank you for your business!"}</p>

        <h3 className="font-semibold mt-3">Terms & Conditions</h3>
        <p>
          {data.terms ||
            "Payment is due within 30 days. Buyer responsible for applicable taxes and freight."}
        </p>
      </div>
    </div>
  );
};

export default StandardTemplate;
